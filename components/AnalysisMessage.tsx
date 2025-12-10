'use client';

import React from 'react';
import { ChartData } from '@/types/wizard';
import ChartCard from './ChartCard';
import MetricsSummary from './MetricsSummary';

interface AnalysisMessageProps {
  chartData: ChartData[];
  metricsSummary?: {
    deltaPercent: number;
    direction: 'up' | 'down';
    keyDrivers: string[];
  };
}

export default function AnalysisMessage({ chartData, metricsSummary }: AnalysisMessageProps) {
  return (
    <div className="space-y-6 my-6">
      {/* Metrics Summary */}
      {metricsSummary && (
        <MetricsSummary
          deltaPercent={metricsSummary.deltaPercent}
          direction={metricsSummary.direction}
          keyDrivers={metricsSummary.keyDrivers}
        />
      )}

      {/* Display all charts */}
      <div className="grid grid-cols-1 gap-6">
        {chartData.map((chart, index) => (
          <ChartCard key={`chart-${index}`} data={chart} />
        ))}
      </div>
    </div>
  );
}
