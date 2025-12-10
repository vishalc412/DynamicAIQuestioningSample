'use client';

import React from 'react';
import { WizardState, WizardEvent, Message, ChartData } from '@/types/wizard';
import MessageBubble from './MessageBubble';
import ChoiceChipGroup from './ChoiceChipGroup';
import ChartCard from './ChartCard';
import InlineLoader from './InlineLoader';

interface ConversationPanelProps {
  state: WizardState;
  messages: Message[];
  chartData: ChartData | null;
  onEvent: (event: WizardEvent) => void;
}

export default function ConversationPanel({
  state,
  messages,
  chartData,
  onEvent,
}: ConversationPanelProps) {
  const regionChoices = [
    { id: 'North America', label: 'North America', icon: '🌎' },
  ];

  const salesKpiChoices = [
    { id: 'Store sales', label: 'Store sales', icon: '🏪' },
    { id: 'Overall sales', label: 'Overall sales', icon: '📊' },
    { id: 'Joint business planning', label: 'Joint business planning', icon: '🤝' },
    { id: 'Channel sales', label: 'Channel sales', icon: '📱' },
    { id: 'Online sales', label: 'Online sales', icon: '🛒' },
  ];

  const marketingKpiChoices = [
    { id: 'Campaign performance', label: 'Campaign performance', icon: '📢' },
    { id: 'Trade promotions impact', label: 'Trade promotions impact', icon: '💰' },
  ];

  const deepDiveChoices = [
    { id: 'Store', label: 'Store' },
    { id: 'Category', label: 'Category' },
    { id: 'Customer segment', label: 'Customer segment' },
    { id: 'Channel', label: 'Channel' },
  ];

  return (
    <div className="flex-[0_0_60%] max-w-[880px] h-screen flex flex-col">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border-soft">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-text-primary">
            FMCG Sales & JBP Assistant
          </h1>
          {state.region && (
            <span className="px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium border border-accent-primary/30">
              {state.region}
            </span>
          )}
        </div>
      </div>

      {/* Scrollable conversation area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        {/* Messages */}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Welcome state */}
        {state.step === 'welcome' && (
          <div className="animate-slide-up space-y-6 pt-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold text-text-primary">
                Hi {state.name}, welcome back.
              </h2>
              <p className="text-lg text-text-secondary max-w-xl">
                As a {state.role} for North America, I can help you analyze FMCG sales and
                joint business planning.
              </p>
              <p className="text-text-muted">
                You can answer by clicking an option or typing.
              </p>
            </div>
            <button
              onClick={() => onEvent({ type: 'START_ANALYSIS' })}
              className="px-8 py-4 gradient-accent rounded-xl text-white font-medium text-lg shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Start analysis
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

        {/* Chart display */}
        {chartData && state.step === 'result' && (
          <div className="space-y-6">
            <ChartCard data={chartData} chartType="bar" />

            {/* Deep dive prompt */}
            {state.showDeepDivePrompt && (
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
          </div>
        )}

        {/* Deep dive dimension selection */}
        {state.step === 'deepDive' && (
          <div className="space-y-4">
            <ChoiceChipGroup
              choices={deepDiveChoices}
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
