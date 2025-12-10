'use client';

import React, { useState, useEffect } from 'react';
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
import { ChartData, WizardEvent } from '@/types/wizard';
import ChartModal from './ChartModal';
import DataPopup from './DataPopup';

interface ChartCardProps {
  data: ChartData;
  onEvent?: (event: WizardEvent) => void;
}

export default function ChartCard({ data, onEvent }: ChartCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataPopupOpen, setIsDataPopupOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading effect with human-like messages
  useEffect(() => {
    const messages = [
      "🔍 Analyzing your data...",
      "📊 Preparing visualizations...",
      "✨ Almost there...",
      "🎯 Finalizing insights..."
    ];

    let messageIndex = 0;
    setLoadingMessage(messages[0]);

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingMessage(messages[messageIndex]);
    }, 600);

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 25;
      });
    }, 200);

    const timer = setTimeout(() => {
      setIsLoading(false);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleChartClick = (clickData: any) => {
    setSelectedSegment(clickData);
    setIsDataPopupOpen(true);

    // Also trigger the original event for chat interaction
    if (onEvent && clickData) {
      onEvent({ type: 'CHART_CLICK', data: clickData });
    }
  };

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

        {isLoading ? (
          <div className="h-[320px] w-full rounded-2xl overflow-hidden relative bg-gradient-to-br from-app-bg via-accent-primary/5 to-app-bg">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/10 to-transparent animate-shimmer bg-[length:200%_100%]"></div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-accent-primary/30 rounded-full animate-pulse"
                  style={{
                    left: `${10 + (i * 7)}%`,
                    top: `${20 + (i % 4) * 20}%`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: `${1.5 + (i % 3) * 0.5}s`
                  }}
                />
              ))}
            </div>

            {/* Main content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Smarty brain icon with pulse */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 border border-accent-primary/30 flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-accent-primary/50 animate-ping"></div>
              </div>

              {/* Message */}
              <div className="text-center space-y-3 px-6">
                <p className="text-text-primary text-lg font-semibold animate-pulse">
                  {loadingMessage}
                </p>
                <p className="text-text-muted text-sm">
                  Please wait, I'm working on it for you...
                </p>

                {/* Progress bar */}
                <div className="w-64 mx-auto mt-4">
                  <div className="h-2 bg-app-bg/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-accent-primary text-xs mt-2 font-semibold">
                    {Math.min(Math.round(loadingProgress), 100)}% Complete
                  </p>
                </div>

                {/* Typing dots */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-accent-primary rounded-full animate-bounce"
                      style={{
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: '0.6s'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                  animationBegin={0}
                  animationDuration={1500}
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
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                    activeDot={{ onClick: (e, payload) => handleChartClick(payload), r: 8 }}
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
                    animationDuration={1500}
                    animationBegin={index * 200}
                    onClick={handleChartClick}
                    className="cursor-pointer"
                  />
                ))}
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      <ChartModal
        data={data}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEvent={onEvent}
      />

      <DataPopup
        data={data}
        selectedSegment={selectedSegment}
        isOpen={isDataPopupOpen}
        onClose={() => setIsDataPopupOpen(false)}
      />
    </>
  );
}
