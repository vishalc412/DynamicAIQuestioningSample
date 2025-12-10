'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartData } from '@/types/wizard';
import ChartModal from './ChartModal';

interface ChartCardProps {
  data: ChartData;
}

export default function ChartCard({ data }: ChartCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Transform data for recharts
  const chartData = data.xAxis.map((label, index) => {
    const point: any = { name: label };
    data.series.forEach((series) => {
      point[series.name] = series.values[index];
    });
    return point;
  });

  const colors = ['#4ade80', '#38bdf8', '#f472b6', '#fbbf24', '#a78bfa', '#fb923c'];

  return (
    <>
      <div className="animate-slide-up bg-app-panel gradient-panel rounded-3xl p-6 border border-border-soft shadow-2xl relative group">
        {/* Expand button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-6 right-6 w-10 h-10 bg-app-bg/80 backdrop-blur-sm border border-border-soft/50 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-accent-primary/20 hover:border-accent-primary/50 transition-all duration-200 flex items-center justify-center z-10"
          title="Expand chart"
        >
          <svg className="w-5 h-5 text-text-muted hover:text-accent-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-text-primary mb-1">{data.title}</h3>
          <p className="text-text-secondary text-sm">{data.subtitle}</p>
        </div>

      <ResponsiveContainer width="100%" height={320}>
        {data.type === 'pie' ? (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey={data.series[0]?.name || 'value'}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#151824',
                border: '1px solid rgba(148, 163, 184, 0.24)',
                borderRadius: '12px',
                color: '#f9fafb',
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
          </PieChart>
        ) : data.type === 'line' ? (
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151824',
                border: '1px solid rgba(148, 163, 184, 0.24)',
                borderRadius: '12px',
                color: '#f9fafb',
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            {data.series.map((series, index) => (
              <Line
                key={series.name}
                type="monotone"
                dataKey={series.name}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        ) : (
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151824',
                border: '1px solid rgba(148, 163, 184, 0.24)',
                borderRadius: '12px',
                color: '#f9fafb',
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            {data.series.map((series, index) => (
              <Bar
                key={series.name}
                dataKey={series.name}
                fill={colors[index % colors.length]}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
      </div>

      <ChartModal
        data={data}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
