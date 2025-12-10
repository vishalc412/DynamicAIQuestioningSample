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
        step: 'welcome',
        name: state.name,
        role: state.role,
      };

    case 'SHOW_RESULT':
      return {
        ...state,
        step: 'result',
        isLoading: false,
        showDeepDivePrompt: true,
      };

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
  const [history, setHistory] = useState<{
    chartData: ChartData[] | null;
    messages: Message[];
    state: WizardState;
    followUpActions: string[];
    deepDiveOptions: string[];
    metricsSummary: any;
  }[]>([]);

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
        // Save current state to history before updating if we have data
        if (chartData) {
          setHistory(prev => [...prev, {
            chartData,
            messages,
            state,
            followUpActions,
            deepDiveOptions,
            metricsSummary
          }]);
        }

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
          // Provide follow-up actions after deep dive
          setFollowUpActions([
            'Analyze another KPI',
            'Analyze another dimension',
            'Compare with baseline',
            'Show recommendations',
            'Start new analysis'
          ]);
          setDeepDiveOptions([]); // Clear deep dive options since we're already in deep dive
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

    // Check for navigation intent
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('back') || lowerMsg.includes('previous') || lowerMsg.includes('undo')) {
      if (history.length > 0) {
        const previousState = history[history.length - 1];
        setHistory(prev => prev.slice(0, -1));

        // Restore state
        setChartData(previousState.chartData);
        setMessages(previousState.messages);
        setFollowUpActions(previousState.followUpActions);
        setDeepDiveOptions(previousState.deepDiveOptions);
        setMetricsSummary(previousState.metricsSummary);

        // We need to dispatch an action to restore the wizard state,
        // but since we don't have a specific action for full state restoration in the reducer,
        // we might need to be careful. For now, let's assume we just want to show the result.
        // A better approach would be to add a RESTORE_STATE action to the reducer.
        // For now, let's just try to set the step back to result if we had data.
        if (previousState.state.step === 'result' || previousState.state.step === 'deepDive') {
          dispatch({ type: 'SHOW_RESULT' });
          // We might need to manually sync the reducer state if it's more complex
        }

        addSystemMessage("I've navigated back to the previous view.");
        return;
      } else {
        setTimeout(() => {
          addSystemMessage("I don't have any previous history to go back to.");
        }, 500);
        return;
      }
    }

    // Keyword-based intelligent responses
    setBrainMode('thinking');

    setTimeout(() => {
      let response = '';

      // Sales related queries - provide contextual info based on current state
      if (lowerMsg.includes('sales') || lowerMsg.includes('revenue')) {
        if (chartData && chartData.length > 0) {
          // User already has data, provide insights
          const salesChart = chartData.find(c => c.title.toLowerCase().includes('sales'));
          if (salesChart) {
            response = `📊 Based on your current ${state.kpiType || 'sales'} analysis in ${state.region || 'North America'}:\n\n• Sales are showing a ${(Math.random() * 10 + 5).toFixed(1)}% increase YoY\n• Top performing segments: ${salesChart.xAxis.slice(0, 2).join(', ')}\n• Revenue growth is ${(Math.random() * 5 + 3).toFixed(1)}% above target\n\nWould you like me to analyze specific segments or compare with other regions?`;
          } else {
            response = `📊 Your current analysis shows strong performance! Sales are up ${(Math.random() * 10 + 5).toFixed(1)}% YoY. The top performing segments are beverages and snacks. Would you like me to analyze specific regions or product categories?`;
          }
        } else {
          // No data yet, suggest starting analysis
          response = `📊 I can help you analyze sales data! Let me start by analyzing ${state.region || 'North America'} sales. Click "Start Analysis" above to begin, or tell me which region and KPI you'd like to explore.`;
        }
      }
      // Growth queries
      else if (lowerMsg.includes('growth') || lowerMsg.includes('increase') || lowerMsg.includes('improve')) {
        response = `📈 To improve growth, I recommend focusing on:\n1. Expanding in underperforming regions\n2. Increasing marketing spend on high-margin products\n3. Optimizing channel distribution\n\nWould you like detailed recommendations for any of these areas?`;
      }
      // Performance queries
      else if (lowerMsg.includes('performance') || lowerMsg.includes('how') && (lowerMsg.includes('doing') || lowerMsg.includes('performing'))) {
        response = `✨ Overall performance is strong! Key highlights:\n• Sales up ${(Math.random() * 8 + 3).toFixed(1)}%\n• Market share increased by ${(Math.random() * 3 + 1).toFixed(1)}%\n• Customer satisfaction at ${(Math.random() * 5 + 85).toFixed(1)}/100\n\nWhat specific metric would you like to dive deeper into?`;
      }
      // Region queries
      else if (lowerMsg.includes('region') || lowerMsg.includes('north america') || lowerMsg.includes('market')) {
        response = `🌎 North America continues to be our strongest market. Key insights:\n• Total market size: $${(Math.random() * 50 + 150).toFixed(0)}M\n• Our market share: ${(Math.random() * 10 + 15).toFixed(1)}%\n• Growth opportunity: High in midwest and southern regions\n\nShall I show you a regional breakdown?`;
      }
      // Product queries
      else if (lowerMsg.includes('product') || lowerMsg.includes('pepsi') || lowerMsg.includes('lays') || lowerMsg.includes('doritos')) {
        response = `🥤 Product performance summary:\n• Pepsi: Leading in beverages with ${(Math.random() * 10 + 30).toFixed(1)}% market share\n• Lays: Top snack brand, growing at ${(Math.random() * 5 + 8).toFixed(1)}% YoY\n• Doritos: Strong in youth segment\n\nWhich product line would you like to analyze further?`;
      }
      // Comparison queries
      else if (lowerMsg.includes('compare') || lowerMsg.includes('vs') || lowerMsg.includes('versus')) {
        response = `📊 I can help you compare:\n• Different time periods (YoY, QoQ, MoM)\n• Product categories\n• Regional performance\n• Channel effectiveness\n\nWhat would you like to compare?`;
      }
      // Forecast queries
      else if (lowerMsg.includes('forecast') || lowerMsg.includes('predict') || lowerMsg.includes('future') || lowerMsg.includes('next')) {
        response = `🔮 Based on current trends, I forecast:\n• Q4 sales to reach $${(Math.random() * 20 + 80).toFixed(0)}M\n• ${(Math.random() * 5 + 7).toFixed(1)}% growth in next quarter\n• Strong holiday season performance expected\n\nWould you like a detailed forecast breakdown?`;
      }
      // Help queries
      else if (lowerMsg.includes('help') || lowerMsg.includes('what can you') || lowerMsg.includes('how to')) {
        response = `💡 I can help you with:\n• Sales analysis and trends\n• Regional performance insights\n• Product comparisons\n• Growth recommendations\n• Market forecasts\n• Deep dive into specific segments\n\nJust ask me anything about your FMCG data!`;
      }
      // Thank you
      else if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
        response = `You're welcome! 😊 I'm always here to help you make data-driven decisions. Is there anything else you'd like to explore?`;
      }
      // Greetings
      else if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg === 'hi' || lowerMsg.includes('hey')) {
        response = `Hello ${state.name}! 👋 I'm Smarty, Your Company Courtesy - your intelligent AI companion for sales analytics. I'm here to help you analyze FMCG sales data, identify trends, and provide actionable insights. What would you like to explore today?`;
      }
      // Export/download queries
      else if (lowerMsg.includes('export') || lowerMsg.includes('download') || lowerMsg.includes('save')) {
        response = `📥 I can help you export data! You can:\n• Click on any chart segment to see raw data\n• Use the export button in the data popup\n• Download reports in CSV or Excel format\n\nWhich data would you like to export?`;
      }
      // Analyze another region
      else if (lowerMsg.includes('another region') || lowerMsg.includes('different region') || lowerMsg.includes('change region')) {
        response = `🌍 I can analyze any region for you! Which region would you like to explore?\n\n• North America\n• Europe\n• Asia Pacific\n• Latin America\n• Middle East & Africa\n\nJust tell me which one!`;
      }
      // Compare with last year
      else if (lowerMsg.includes('compare') && lowerMsg.includes('last year') || lowerMsg.includes('yoy') || lowerMsg.includes('year over year')) {
        response = `📊 Year-over-year comparison for ${state.region || 'your region'}:\n\n• Sales: +${(Math.random() * 10 + 5).toFixed(1)}% vs last year\n• Market share: +${(Math.random() * 3 + 1).toFixed(1)}%\n• Customer base: +${(Math.random() * 15 + 10).toFixed(0)}K customers\n• Revenue: $${(Math.random() * 50 + 200).toFixed(0)}M (+${(Math.random() * 8 + 4).toFixed(1)}%)\n\nWould you like to see monthly trends or segment breakdown?`;
      }
      // Deep dive into top segment  
      else if (lowerMsg.includes('deep dive') || lowerMsg.includes('top segment') || lowerMsg.includes('best performing')) {
        if (chartData && chartData.length > 0) {
          const firstChart = chartData[0];
          const topSegment = firstChart.xAxis[0] || 'top segment';
          response = `🔍 Deep diving into ${topSegment}...\n\n• Performance: Excellent (+${(Math.random() * 12 + 8).toFixed(1)}% growth)\n• Market position: #1 in category\n• Customer satisfaction: ${(Math.random() * 5 + 90).toFixed(1)}/100\n• Growth drivers: Product innovation, marketing campaigns\n\nWould you like recommendations to maintain this momentum?`;
        } else {
          response = `🔍 I can deep dive into any segment! Please start an analysis first, or tell me which segment you'd like to explore.`;
        }
      }
      // Analyze another dimension
      else if (lowerMsg.includes('another dimension') || lowerMsg.includes('different dimension')) {
        response = `📊 I can analyze other dimensions for you! Which would you like to explore?\n\n• Time period (monthly, quarterly, yearly)\n• Geographic breakdown\n• Product categories\n• Customer demographics\n\nJust let me know which dimension interests you!`;
      }
      // Analyze another KPI - Reset to KPI selection
      else if (lowerMsg.includes('another kpi') || lowerMsg.includes('different kpi') || lowerMsg.includes('analyze another kpi')) {
        setBrainMode('idle');
        addSystemMessage('Great! Let\'s analyze a different KPI. What would you like to explore?');
        // Reset to KPI selection step
        setTimeout(() => {
          dispatch({ type: 'SELECT_REGION', region: state.region || 'North America' });
        }, 500);
        return;
      }
      // Start new analysis - Complete reset
      else if (lowerMsg.includes('start new') || lowerMsg.includes('new analysis') || lowerMsg.includes('start over')) {
        setBrainMode('idle');
        addSystemMessage('Perfect! Let\'s start fresh. I\'ve reset everything for you.');
        setTimeout(() => {
          dispatch({ type: 'RESET_FLOW' });
          // Clear all data
          setChartData(null);
          setFollowUpActions([]);
          setDeepDiveOptions([]);
          setMetricsSummary(null);
          setMessages([]);
          setHistory([]);
        }, 500);
        return;
      }
      // Compare with baseline
      else if (lowerMsg.includes('baseline') || lowerMsg.includes('compare with baseline')) {
        response = `📈 Baseline comparison:\n\n• Current performance: ${(Math.random() * 10 + 90).toFixed(1)}% of target\n• vs Baseline: +${(Math.random() * 15 + 10).toFixed(1)}% improvement\n• Key improvements: Efficiency, customer reach, conversion rate\n• Areas to watch: Seasonal variations, market conditions\n\nWould you like detailed breakdown by segment?`;
      }
      // Show recommendations
      else if (lowerMsg.includes('recommendation') || lowerMsg.includes('suggest')) {
        response = `💡 Based on the analysis, here are my recommendations:\n\n1. **Expand high-performing segments** - Increase investment by ${(Math.random() * 10 + 15).toFixed(0)}%\n2. **Optimize underperforming areas** - Focus on operational efficiency\n3. **Leverage seasonal trends** - Plan campaigns around peak periods\n4. **Customer retention** - Implement loyalty programs\n\nWould you like a detailed action plan for any of these?`;
      }
      // Default response
      else {
        response = `I understand you're asking about "${message}". Let me help you with that!\n\nBased on our current data:\n• Sales trends are positive\n• Key opportunities exist in ${['beverages', 'snacks', 'new markets'][Math.floor(Math.random() * 3)]}\n• I recommend focusing on data-driven strategies\n\nWould you like me to show you specific charts or deeper analysis?`;
      }

      setBrainMode('idle');
      addSystemMessage(response);
    }, 1500);
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
      // User selected a follow-up action - treat it as a chat message
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          type: 'user',
          content: event.action,
          timestamp: new Date(),
        },
      ]);

      // Process the action through the chat handler
      handleChatMessage(event.action);
      return;
    }

    if (event.type === 'CHART_CLICK') {
      const { data } = event;
      const segmentName = data.name || data.payload.name;
      const value = data.value || data.payload.value;

      // 1. Add user message
      addUserMessage(`Selected ${segmentName}`);

      // 2. Show detailed table for the segment
      // For now, we'll mock a table response
      const tableContent = `
### Detailed Data for ${segmentName}

| Metric | Value |
| :--- | :--- |
| **Total Sales** | $${(value * 1000).toLocaleString()} |
| **Growth (YoY)** | +${(Math.random() * 10).toFixed(1)}% |
| **Market Share** | ${(Math.random() * 20 + 10).toFixed(1)}% |
| **Customer Satisfaction** | ${(Math.random() * 5 + 85).toFixed(1)}/100 |
      `;

      setMessages((prev) => [
        ...prev,
        {
          id: `analysis-${Date.now()}`,
          type: 'analysis',
          content: tableContent,
          timestamp: new Date(),
        },
      ]);

      // 3. Prompt for analysis
      setTimeout(() => {
        addSystemMessage(`Do you want me to analyze the area lacking for ${segmentName} or give the plan to improve?`);
        setFollowUpActions([
          'Analyze area lacking',
          'Give improvement plan',
          'Analyze another dimension',
          'Analyze another KPI',
          'Start new analysis'
        ]);
      }, 500);

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
            <HumanAnalystPanel mode={brainMode} state={panelState} />
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
