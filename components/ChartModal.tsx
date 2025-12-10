'use client';

import React, { useEffect } from 'react';
import { ChartData } from '@/types/wizard';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartModalProps {
  data: ChartData;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChartModal({ data, isOpen, onClose }: ChartModalProps) {
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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 bg-app-bg/80 backdrop-blur-sm border border-border-soft/50 rounded-xl hover:bg-accent-primary/20 hover:border-accent-primary/50 transition-all duration-200 flex items-center justify-center group"
        >
          <svg className="w-6 h-6 text-text-muted group-hover:text-accent-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="h-full flex flex-col p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-text-primary mb-2">{data.title}</h2>
            <p className="text-text-secondary text-lg">{data.subtitle}</p>
          </div>

          {/* Chart */}
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              {data.type === 'pie' ? (
                <PieChart>
                  <Pie
                    data={chartData}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={200}
                    dataKey={data.series[0]?.name || 'value'}
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
                      activeDot={{ r: 8 }}
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
                    />
                  ))}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
