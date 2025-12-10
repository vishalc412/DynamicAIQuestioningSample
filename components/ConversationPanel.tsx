'use client';

import React, { useEffect, useRef } from 'react';
import { WizardState, WizardEvent, Message, ChartData } from '@/types/wizard';
import MessageBubble from './MessageBubble';
import ChoiceChipGroup from './ChoiceChipGroup';
import ChartCard from './ChartCard';
import InlineLoader from './InlineLoader';
import MetricsSummary from './MetricsSummary';
import AnalysisMessage from './AnalysisMessage';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking, isSupported: isSpeechSupported } = useSpeechSynthesis();
  const lastMessageRef = useRef<string>('');

  // Auto-scroll to bottom when new messages or charts appear
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const target = messagesEndRef.current;
        const targetPosition = target.offsetTop;
        const startPosition = container.scrollTop;
        const distance = targetPosition - startPosition;
        const duration = 2000; // 2 seconds for slow, visible scroll
        let start: number | null = null;

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);

          // Easing function for smooth deceleration
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);

          container.scrollTop = startPosition + (distance * easeOutCubic);

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    };

    // Delay to ensure content is rendered
    const timer = setTimeout(scrollToBottom, 300);
    return () => clearTimeout(timer);
  }, [messages, chartData, followUpActions, deepDiveOptions]);

  // Auto-speak system messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'system' && lastMessage.content !== lastMessageRef.current) {
        lastMessageRef.current = lastMessage.content;
        // Auto-speak system messages (Smarty's responses)
        speak(lastMessage.content);
      }
    }
  }, [messages, speak]);

  // Speak welcome message when user first arrives
  const hasSpokenWelcome = useRef(false);
  useEffect(() => {
    if (state.step === 'welcome' && !hasSpokenWelcome.current) {
      const welcomeMessage = `Hello ${state.name}! I'm Smarty, Your Company Courtesy, your intelligent AI companion to help you with your journey. Help me and press Start Journey.`;
      console.log('Preparing to speak welcome message:', welcomeMessage);
      // Delay to ensure component is mounted and audio is ready
      const timer = setTimeout(() => {
        console.log('Attempting to speak welcome message');
        try {
          speak(welcomeMessage);
          hasSpokenWelcome.current = true;
          console.log('Welcome message spoken successfully');
        } catch (error) {
          console.error('Error speaking welcome message:', error);
        }
      }, 2000); // Increased to 2 seconds
      return () => clearTimeout(timer);
    }
  }, [state.step, state.name, speak]);

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
            {/* User Profile */}
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 shadow-xl">
                <div className="w-full h-full rounded-2xl bg-app-panel flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-app-panel"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Welcome, {state.name}
              </h1>
              <p className="text-xs text-text-secondary flex items-center gap-2">
                <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 font-semibold">{state.role}</span>
                <span className="text-text-muted">• Nation-wide Sales Access</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
            {isSpeechSupported && (
              <button
                onClick={stop}
                className={`p-2 rounded-xl transition-all duration-200 ${isSpeaking
                  ? 'bg-accent-primary/20 border border-accent-primary/50 text-accent-primary animate-pulse'
                  : 'bg-app-bg/50 border border-border-soft/50 text-text-muted hover:border-accent-primary/30 hover:text-accent-primary'
                  }`}
                title={isSpeaking ? 'Stop speaking' : 'Voice output enabled'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isSpeaking ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable conversation area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-4 scrollbar-thin scrollbar-thumb-accent-primary/20 scrollbar-track-transparent">
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
                <span className="text-accent-primary text-sm font-semibold">👋 Hi {state.name}!</span>
              </div>
              <h2 className="text-4xl font-bold text-text-primary leading-tight">
                I'm <span className="text-gradient">Smarty</span>, <br />
                <span className="text-2xl text-accent-primary">Your Company Courtesy</span>
              </h2>
              <div className="space-y-3">
                <p className="text-base text-text-secondary max-w-xl leading-relaxed">
                  🎯 <strong className="text-text-primary">Your Intelligent AI Companion</strong> - I'm here to help you with your journey through FMCG data analytics.
                </p>
                <p className="text-sm text-text-secondary max-w-xl leading-relaxed">
                  I specialize in analyzing sales trends, marketing campaigns, and Joint Business Planning (JBP) metrics across your nation-wide portfolio. Whether you need quick insights, deep-dive analysis, or strategic recommendations, I'm here to help you make data-driven decisions faster.
                </p>
                <p className="text-lg text-text-primary font-semibold mt-4">
                  Help me and press Start Journey!
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-accent-primary/10 border border-accent-primary/30 rounded-full text-xs text-accent-primary font-semibold">📊 Real-time Analytics</span>
                  <span className="px-3 py-1 bg-accent-secondary/10 border border-accent-secondary/30 rounded-full text-xs text-accent-secondary font-semibold">🎤 Voice Enabled</span>
                  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-400 font-semibold">🤖 AI-Powered</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-text-muted text-sm">
                <svg className="w-4 h-4 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Let's dive into your data - click below or ask me anything</span>
              </div>
            </div>
            <button
              onClick={() => onEvent({ type: 'START_ANALYSIS' })}
              className="group px-8 py-4 gradient-accent rounded-2xl text-white font-semibold text-lg shadow-2xl hover:shadow-accent-primary/50 hover:scale-105 transition-all duration-200 flex items-center gap-3"
            >
              <span>Start Journey</span>
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
                <ChartCard key={`chart-${index}`} data={chart} onEvent={onEvent} />
              ))}
            </div>

            {/* Deep dive options - show directly as chips (priority over follow-up actions) */}
            {deepDiveOptions.length > 0 ? (
              <div className="animate-slide-up space-y-4 pt-4">
                <p className="text-text-primary text-lg font-semibold">
                  🔍 Want deeper insights? Choose a dimension to analyze:
                </p>
                <ChoiceChipGroup
                  choices={deepDiveOptions.map(option => ({ id: option, label: option }))}
                  onSelect={(dimension) => {
                    onEvent({ type: 'SELECT_DEEP_DIMENSION', dimension });
                  }}
                />
              </div>
            ) : followUpActions.length > 0 ? (
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
            ) : null}
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

        {/* Invisible scroll marker */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
