'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartData } from '@/types/wizard';

interface ChartCardProps {
  data: ChartData;
  chartType?: 'line' | 'bar';
}

export default function ChartCard({ data, chartType = 'bar' }: ChartCardProps) {
  // Transform data for recharts
  const chartData = data.xAxis.map((label, index) => {
    const point: any = { name: label };
    data.series.forEach((series) => {
      point[series.name] = series.values[index];
    });
    return point;
  });

  const colors = ['#4ade80', '#38bdf8', '#f472b6', '#fbbf24'];

  return (
    <div className="animate-slide-up bg-app-panel gradient-panel rounded-3xl p-6 border border-border-soft shadow-2xl">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-text-primary mb-1">{data.title}</h3>
        <p className="text-text-secondary text-sm">{data.subtitle}</p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        {chartType === 'line' ? (
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
  );
}
