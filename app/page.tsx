'use client';

import { useState, useReducer, useEffect } from 'react';
import { WizardState, WizardEvent, Message, ChartData } from '@/types/wizard';
import ConversationPanel from '@/components/ConversationPanel';
import BrainPanel from '@/components/BrainPanel';
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

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
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
      setTimeout(() => {
        if (state.deepDiveDimension && state.kpiType && state.region) {
          const deepData = getDeepDiveData(
            state.kpiType,
            state.region,
            state.deepDiveDimension
          );
          setChartData(deepData);
          setBrainMode('idle');
          dispatch({ type: 'SHOW_RESULT' });
        } else if (state.kpiType && state.region) {
          const response = getMockChartData(state.kpiType, state.region);
          setChartData(response.chart);
          setBrainMode('idle');
          dispatch({ type: 'SHOW_RESULT' });
        }
      }, 3000);
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

    dispatch(event);
  };

  // Create a modified state for the ConversationPanel that includes showDeepDivePrompt
  const panelState: WizardState = {
    ...state,
    step: state.isLoading ? 'analyzing' : (chartData && state.step === 'analyzing' ? 'result' : state.step),
    showDeepDivePrompt: !!(state.step === 'result' && chartData && !state.isLoading && !state.deepDiveDimension),
  };

  return (
    <main className="min-h-screen bg-app-bg flex items-center justify-center p-6">
      <div className="max-w-[1600px] w-full mx-auto">
        <div className="flex gap-8 items-center h-[95vh]">
          <ConversationPanel
            state={panelState}
            messages={messages}
            chartData={chartData}
            onEvent={handleEvent}
          />
          <BrainPanel mode={brainMode} />
        </div>
      </div>
    </main>
  );
}
