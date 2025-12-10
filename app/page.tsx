'use client';

import { useState, useReducer, useEffect } from 'react';
import { WizardState, WizardEvent, Message, ChartData } from '@/types/wizard';
import ConversationPanel from '@/components/ConversationPanel';
import HumanAnalystPanel from '@/components/HumanAnalystPanel';
import ChatInput from '@/components/ChatInput';
import { getMockChartData, getDeepDiveData } from '@/lib/mockData';

// Initial state
const initialState: WizardState = {
  step: 'welcome',
  name: 'Saurabh Sharma',
  role: 'NAM',
  isLoading: false,
};

// Wizard reducer
function wizardReducer(state: WizardState, event: WizardEvent): WizardState {
  switch (event.type) {
    case 'START_ANALYSIS':
      return { ...state, step: 'region' };

    case 'SELECT_REGION':
      return { ...state, region: event.region, step: 'kpi' };

    case 'SELECT_KPI':
      return { ...state, kpiType: event.kpiType };

    case 'REQUEST_ANALYSIS':
      return { ...state, step: 'analyzing', isLoading: true };

    case 'TOGGLE_DEEP_DIVE':
      if (event.wantDeepDive) {
        return { ...state, step: 'deepDive', showDeepDivePrompt: false };
      } else {
        return { ...state, step: 'complete', showDeepDivePrompt: false };
      }

    case 'SELECT_DEEP_DIMENSION':
      return {
        ...state,
        deepDiveDimension: event.dimension,
        step: 'analyzing',
        isLoading: true,
      };

    case 'RESET_FLOW':
      return {
        ...initialState,
        step: 'region',
        name: state.name,
        role: state.role,
      };

    case 'SHOW_RESULT':
      return { ...state, step: 'result', isLoading: false };

    case 'SELECT_FOLLOW_UP_ACTION':
      return { ...state, step: 'complete', showDeepDivePrompt: false };

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [followUpActions, setFollowUpActions] = useState<string[]>([]);
  const [deepDiveOptions, setDeepDiveOptions] = useState<string[]>([]);
  const [metricsSummary, setMetricsSummary] = useState<{
    deltaPercent: number;
    direction: 'up' | 'down';
    keyDrivers: string[];
  } | null>(null);
  const [brainMode, setBrainMode] = useState<'idle' | 'thinking'>('idle');

  // Handle step changes and add messages
  useEffect(() => {
    if (state.step === 'region') {
      addSystemMessage('Which region do you want to analyze?');
    } else if (state.step === 'kpi') {
      addUserMessage(`North America`);
      addSystemMessage(
        `Great! For North America, what would you like to analyze?`
      );
    } else if (state.step === 'analyzing') {
      if (state.deepDiveDimension) {
        addUserMessage(state.deepDiveDimension);
        addSystemMessage(`Let me analyze ${state.kpiType} by ${state.deepDiveDimension}...`);
      } else {
        addUserMessage(state.kpiType || '');
        addSystemMessage(
          `Okay, let me analyze ${state.kpiType} in ${state.region}...`
        );
      }

      // Simulate API call
      setBrainMode('thinking');
      const timer = setTimeout(() => {
        if (state.deepDiveDimension && state.kpiType && state.region) {
          const deepData = getDeepDiveData(
            state.kpiType,
            state.region,
            state.deepDiveDimension
          );

          // Add deep dive analysis as a message
          setMessages((prev) => [
            ...prev,
            {
              id: `deep-dive-${Date.now()}`,
              type: 'analysis',
              content: 'Deep dive analysis complete',
              timestamp: new Date(),
              chartData: deepData,
            },
          ]);

          setChartData(deepData);
          setFollowUpActions([]);
          setDeepDiveOptions([]);
          setMetricsSummary(null); // Clear metrics summary for deep dive
          setBrainMode('idle');
          dispatch({ type: 'SHOW_RESULT' });
        } else if (state.kpiType && state.region) {
          const response = getMockChartData(state.kpiType, state.region);

          // Add analysis results as a message in the timeline
          setMessages((prev) => [
            ...prev,
            {
              id: `analysis-${Date.now()}`,
              type: 'analysis',
              content: 'Analysis complete',
              timestamp: new Date(),
              chartData: response.charts,
              metricsSummary: response.metricsSummary,
              followUpActions: response.followUpActions,
              deepDiveOptions: response.deepDiveOptions,
            },
          ]);

          setChartData(response.charts);
          setFollowUpActions(response.followUpActions);
          setDeepDiveOptions(response.deepDiveOptions);
          setMetricsSummary(response.metricsSummary);
          setBrainMode('idle');
          dispatch({ type: 'SHOW_RESULT' });
        } else {
          // Fallback: if no kpiType or region
          setBrainMode('idle');
          console.error('Missing kpiType or region:', { kpiType: state.kpiType, region: state.region });
        }
      }, 3000);

      // Cleanup function to prevent memory leaks
      return () => clearTimeout(timer);
    } else if (state.step === 'deepDive') {
      addSystemMessage(
        'What dimension would you like to explore? Choose from Store, Category, Customer segment, or Channel.'
      );
    }
  }, [state.step, state.deepDiveDimension]);

  const addSystemMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random()}`,
        type: 'system',
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random()}`,
        type: 'user',
        content,
        timestamp: new Date(),
      },
    ]);
  };

  // Handle chat input messages
  const handleChatMessage = (message: string) => {
    // Add user message
    addUserMessage(message);

    // Simulate AI response
    setTimeout(() => {
      addSystemMessage(`I understand you want to: "${message}". This feature is being enhanced to provide dynamic responses based on your input.`);
    }, 1000);
  };

  // Custom dispatch to handle state with showDeepDivePrompt
  const handleEvent = (event: WizardEvent) => {
    if (event.type === 'REQUEST_ANALYSIS') {
      dispatch(event);
      return;
    }

    if (event.type === 'TOGGLE_DEEP_DIVE' && event.wantDeepDive === false) {
      // User said no to deep dive
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          type: 'user',
          content: 'No, I\'m good',
          timestamp: new Date(),
        },
      ]);
      dispatch(event);
      return;
    }

    if (event.type === 'TOGGLE_DEEP_DIVE' && event.wantDeepDive === true) {
      // User wants deep dive
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          type: 'user',
          content: 'Yes, show me more',
          timestamp: new Date(),
        },
      ]);
      dispatch(event);
      return;
    }

    if (event.type === 'SELECT_FOLLOW_UP_ACTION') {
      // User selected a follow-up action
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          type: 'user',
          content: event.action,
          timestamp: new Date(),
        },
      ]);
      addSystemMessage(`Great! I'll help you with "${event.action}". This advanced feature is being prepared for you.`);
      dispatch(event);
      return;
    }

    dispatch(event);
  };

  // Create a modified state for the ConversationPanel that includes showDeepDivePrompt
  const panelState: WizardState = {
    ...state,
    step: state.isLoading ? 'analyzing' : (chartData && state.step === 'analyzing' ? 'result' : state.step),
    showDeepDivePrompt: !!(state.step === 'result' && chartData && !state.isLoading && !state.deepDiveDimension),
  };

  return (
    <main className="h-screen bg-app-bg flex flex-col overflow-hidden">
      {/* Main content area - Conversation and Brain panels */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto h-full">
          <div className="flex gap-8 items-stretch h-full">
            <ConversationPanel
              state={panelState}
              messages={messages}
              chartData={chartData}
              followUpActions={followUpActions}
              deepDiveOptions={deepDiveOptions}
              metricsSummary={metricsSummary}
              onEvent={handleEvent}
            />
            <HumanAnalystPanel mode={brainMode} />
          </div>
        </div>
      </div>

      {/* Footer - Chat input */}
      <div className="flex-shrink-0">
        <ChatInput
          onSendMessage={handleChatMessage}
          disabled={state.isLoading}
        />
      </div>
    </main>
  );
}
