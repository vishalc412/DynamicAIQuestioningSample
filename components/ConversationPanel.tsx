'use client';

import React from 'react';
import { WizardState, WizardEvent, Message, ChartData } from '@/types/wizard';
import MessageBubble from './MessageBubble';
import ChoiceChipGroup from './ChoiceChipGroup';
import ChartCard from './ChartCard';
import InlineLoader from './InlineLoader';
import MetricsSummary from './MetricsSummary';
import AnalysisMessage from './AnalysisMessage';

interface ConversationPanelProps {
  state: WizardState;
  messages: Message[];
  chartData: ChartData[] | null;
  followUpActions: string[];
  deepDiveOptions: string[];
  metricsSummary: {
    deltaPercent: number;
    direction: 'up' | 'down';
    keyDrivers: string[];
  } | null;
  onEvent: (event: WizardEvent) => void;
}

export default function ConversationPanel({
  state,
  messages,
  chartData,
  followUpActions,
  deepDiveOptions,
  metricsSummary,
  onEvent,
}: ConversationPanelProps) {
  const regionChoices = [
    { id: 'North America', label: 'North America' },
  ];

  const salesKpiChoices = [
    { id: 'Store sales', label: 'Store sales' },
    { id: 'Overall sales', label: 'Overall sales' },
    { id: 'Joint business planning', label: 'Joint business planning' },
    { id: 'Channel sales', label: 'Channel sales' },
    { id: 'Online sales', label: 'Online sales' },
  ];

  const marketingKpiChoices = [
    { id: 'Campaign performance', label: 'Campaign performance' },
    { id: 'Trade promotions impact', label: 'Trade promotions impact' },
  ];

  return (
    <div className="flex-[0_0_68%] max-w-[1100px] h-full flex flex-col bg-app-panel gradient-panel rounded-3xl shadow-2xl overflow-hidden border border-border-soft/50">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border-soft/50 bg-gradient-to-r from-app-panel via-app-chat-system to-app-panel">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary p-0.5 shadow-xl">
                <div className="w-full h-full rounded-2xl bg-app-panel flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent-secondary rounded-full border-2 border-app-panel"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Your Personal Sales Analyst
              </h1>
              <p className="text-xs text-text-secondary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse"></span>
                Available 24/7 for insights
              </p>
            </div>
          </div>
          {state.region && (
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/30 backdrop-blur-sm">
              <span className="text-accent-primary text-sm font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {state.region}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable conversation area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 scrollbar-thin scrollbar-thumb-accent-primary/20 scrollbar-track-transparent">
        {/* Messages and Analysis Results */}
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            {message.type === 'analysis' && message.chartData ? (
              <AnalysisMessage
                chartData={message.chartData}
                metricsSummary={message.metricsSummary}
              />
            ) : (
              <MessageBubble message={message} />
            )}
          </React.Fragment>
        ))}

        {/* Welcome state */}
        {state.step === 'welcome' && (
          <div className="animate-slide-up space-y-8 pt-12">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full mb-2">
                <span className="text-accent-primary text-sm font-semibold">Welcome</span>
              </div>
              <h2 className="text-4xl font-bold text-text-primary leading-tight">
                Hi {state.name}, <br />
                <span className="text-gradient">Ready to analyze sales?</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
                As a <span className="text-accent-primary font-semibold">{state.role}</span> for North America, I can help you analyze FMCG sales,
                marketing campaigns, and joint business planning metrics.
              </p>
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <span>Click an option below or type your question</span>
              </div>
            </div>
            <button
              onClick={() => onEvent({ type: 'START_ANALYSIS' })}
              className="group px-8 py-4 gradient-accent rounded-2xl text-white font-semibold text-lg shadow-2xl hover:shadow-accent-primary/50 hover:scale-105 transition-all duration-200 flex items-center gap-3"
            >
              <span>Start Analysis</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        )}

        {/* Region selection */}
        {state.step === 'region' && (
          <div className="space-y-4">
            <ChoiceChipGroup
              choices={regionChoices}
              onSelect={(region) => onEvent({ type: 'SELECT_REGION', region })}
            />
          </div>
        )}

        {/* KPI selection */}
        {state.step === 'kpi' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-text-secondary text-sm font-medium">Sales KPIs</p>
              <ChoiceChipGroup
                choices={salesKpiChoices}
                onSelect={(kpiType) => {
                  onEvent({ type: 'SELECT_KPI', kpiType });
                  setTimeout(() => onEvent({ type: 'REQUEST_ANALYSIS' }), 300);
                }}
              />
            </div>
            <div className="space-y-3">
              <p className="text-text-secondary text-sm font-medium">Marketing KPIs</p>
              <ChoiceChipGroup
                choices={marketingKpiChoices}
                onSelect={(kpiType) => {
                  onEvent({ type: 'SELECT_KPI', kpiType });
                  setTimeout(() => onEvent({ type: 'REQUEST_ANALYSIS' }), 300);
                }}
              />
            </div>
          </div>
        )}

        {/* Loading state */}
        {state.isLoading && <InlineLoader />}

        {/* Chart display - Multiple charts */}
        {chartData && state.step === 'result' && (
          <div className="space-y-6">
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

            {/* Deep dive prompt */}
            {state.showDeepDivePrompt && deepDiveOptions.length > 0 && (
              <div className="animate-slide-up space-y-4">
                <p className="text-text-primary text-lg">
                  Would you like a deeper analysis with filters?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => onEvent({ type: 'TOGGLE_DEEP_DIVE', wantDeepDive: true })}
                    className="px-6 py-3 bg-accent-primary text-app-bg rounded-xl font-medium hover:scale-105 transition-transform"
                  >
                    Yes, show me more
                  </button>
                  <button
                    onClick={() => onEvent({ type: 'TOGGLE_DEEP_DIVE', wantDeepDive: false })}
                    className="px-6 py-3 bg-chip-bg border border-border-soft text-text-primary rounded-xl font-medium hover:bg-chip-active/50 transition-colors"
                  >
                    No, I'm good
                  </button>
                </div>
              </div>
            )}

            {/* Follow-up actions */}
            {!state.showDeepDivePrompt && followUpActions.length > 0 && (
              <div className="animate-slide-up space-y-4 pt-4">
                <p className="text-text-primary text-lg font-semibold">
                  What would you like me to do next?
                </p>
                <ChoiceChipGroup
                  choices={followUpActions.map(action => ({ id: action, label: action }))}
                  onSelect={(action) => {
                    onEvent({ type: 'SELECT_FOLLOW_UP_ACTION', action });
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Deep dive dimension selection */}
        {state.step === 'deepDive' && deepDiveOptions.length > 0 && (
          <div className="space-y-4">
            <ChoiceChipGroup
              choices={deepDiveOptions.map(option => ({ id: option, label: option }))}
              onSelect={(dimension) =>
                onEvent({ type: 'SELECT_DEEP_DIMENSION', dimension })
              }
            />
          </div>
        )}

        {/* Complete state */}
        {state.step === 'complete' && (
          <div className="animate-slide-up space-y-4 pt-6">
            <p className="text-text-primary text-lg">
              Great! I hope this analysis was helpful. Ready for another one?
            </p>
            <button
              onClick={() => onEvent({ type: 'RESET_FLOW' })}
              className="px-8 py-4 gradient-accent rounded-xl text-white font-medium text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Start new analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
