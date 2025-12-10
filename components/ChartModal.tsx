'use client';

import React, { useEffect, useState } from 'react';
import { ChartData, WizardEvent } from '@/types/wizard';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';

interface ChartModalProps {
  data: ChartData;
  isOpen: boolean;
  onClose: () => void;
  onEvent?: (event: WizardEvent) => void;
}

export default function ChartModal({ data, isOpen, onClose, onEvent }: ChartModalProps) {
  const [showTable, setShowTable] = useState(false);

  const handleChartClick = (data: any) => {
    if (onEvent && data) {
      onEvent({ type: 'CHART_CLICK', data });
      onClose(); // Close modal on selection to show chat
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const colors = ['#4ade80', '#38bdf8', '#fb7185', '#fbbf24', '#a78bfa', '#34d399'];

  const chartData = data.xAxis.map((label, index) => {
    const point: any = { name: label };
    data.series.forEach((s) => {
      point[s.name] = s.values[index];
    });
    return point;
  });

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-[95vw] h-[90vh] bg-gradient-to-br from-app-panel to-app-bg border border-border-soft/50 rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controls */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
          <button
            onClick={() => setShowTable(!showTable)}
            className="w-12 h-12 bg-app-bg/80 backdrop-blur-sm border border-border-soft/50 rounded-xl hover:bg-accent-primary/20 hover:border-accent-primary/50 transition-all duration-200 flex items-center justify-center group"
            title={showTable ? "Show Chart" : "Show Table"}
          >
            <svg className="w-6 h-6 text-text-muted group-hover:text-accent-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showTable ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7-4h14M4 6h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
              )}
            </svg>
          </button>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-app-bg/80 backdrop-blur-sm border border-border-soft/50 rounded-xl hover:bg-accent-primary/20 hover:border-accent-primary/50 transition-all duration-200 flex items-center justify-center group"
          >
            <svg className="w-6 h-6 text-text-muted group-hover:text-accent-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="h-full flex flex-col p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-text-primary mb-2">{data.title}</h2>
            <p className="text-text-secondary text-lg">{data.subtitle}</p>
          </div>

          {/* Chart or Table */}
          <div className="flex-1 flex items-center justify-center overflow-auto">
            {showTable ? (
              <div className="w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-accent-primary/20 scrollbar-track-transparent p-4">
                <table className="w-full text-left text-text-secondary">
                  <thead className="text-sm text-text-muted uppercase bg-app-bg/50 sticky top-0">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-xl border-b border-border-soft/30">Label</th>
                      {data.series.map((s) => (
                        <th key={s.name} className="px-6 py-4 border-b border-border-soft/30">{s.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-lg">
                    {data.xAxis.map((label, i) => (
                      <tr key={label} className="border-b border-border-soft/30 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-text-primary">{label}</td>
                        {data.series.map((s) => (
                          <td key={s.name} className="px-6 py-4">{s.values[i]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                {data.type === 'pie' ? (
                  <PieChart>
                    <Pie
                      data={chartData}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={200}
                      dataKey={data.series[0]?.name || 'value'}
                      onClick={handleChartClick}
                      className="cursor-pointer"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#151824',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '12px',
                      }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '14px' }}
                      iconType="circle"
                    />
                  </PieChart>
                ) : data.type === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis
                      dataKey="name"
                      stroke="#9ca3af"
                      style={{ fontSize: '14px' }}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      style={{ fontSize: '14px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#151824',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '12px',
                      }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '14px' }}
                      iconType="line"
                    />
                    {data.series.map((s, idx) => (
                      <Line
                        key={s.name}
                        type="monotone"
                        dataKey={s.name}
                        stroke={colors[idx % colors.length]}
                        strokeWidth={3}
                        dot={{ r: 6 }}
                        activeDot={{ onClick: (e, payload) => handleChartClick(payload), r: 8 }}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis
                      dataKey="name"
                      stroke="#9ca3af"
                      style={{ fontSize: '14px' }}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      style={{ fontSize: '14px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#151824',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '12px',
                      }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: '14px' }}
                      iconType="rect"
                    />
                    {data.series.map((s, idx) => (
                      <Bar
                        key={s.name}
                        dataKey={s.name}
                        fill={colors[idx % colors.length]}
                        radius={[8, 8, 0, 0]}
                        onClick={handleChartClick}
                        className="cursor-pointer"
                      />
                    ))}
                  </BarChart>
                )}
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
