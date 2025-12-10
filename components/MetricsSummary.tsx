'use client';

import React from 'react';

interface MetricsSummaryProps {
  deltaPercent: number;
  direction: 'up' | 'down';
  keyDrivers: string[];
}

export default function MetricsSummary({ deltaPercent, direction, keyDrivers }: MetricsSummaryProps) {
  const isPositive = direction === 'up';
  const absoluteDelta = Math.abs(deltaPercent);

  return (
    <div className="animate-slide-up bg-gradient-to-br from-app-panel to-app-chat-system border border-border-soft/50 rounded-2xl p-6 shadow-xl mb-6">
      <div className="flex items-start justify-between gap-6">
        {/* Main metric card */}
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
            isPositive
              ? 'bg-gradient-to-br from-accent-primary/20 to-accent-primary/10 border border-accent-primary/30'
              : 'bg-gradient-to-br from-red-500/20 to-red-500/10 border border-red-500/30'
          }`}>
            {isPositive ? (
              <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            )}
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${isPositive ? 'text-accent-primary' : 'text-red-400'}`}>
                {isPositive ? '+' : '-'}{absoluteDelta}%
              </span>
              <span className="text-text-muted text-sm">vs previous year</span>
            </div>
            <p className="text-text-secondary text-sm mt-1">
              {isPositive ? 'Growth trend' : 'Decline trend'} compared to last year's performance
            </p>
          </div>
        </div>

        {/* Key drivers */}
        <div className="flex-1">
          <h4 className="text-text-primary font-semibold text-sm mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Key Insights
          </h4>
          <ul className="space-y-2">
            {keyDrivers.map((driver, index) => (
              <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                <span className="text-accent-primary mt-0.5">•</span>
                <span>{driver}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
