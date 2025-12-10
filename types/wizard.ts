export type WizardStep =
  | 'welcome'
  | 'region'
  | 'kpi'
  | 'analyzing'
  | 'result'
  | 'deepDive'
  | 'complete';

export type WizardState = {
  step: WizardStep;
  name: string;
  role: string;
  region?: string;
  kpiType?: string;
  deepDiveDimension?: string;
  isLoading: boolean;
  showDeepDivePrompt?: boolean;
};

export type WizardEvent =
  | { type: 'START_ANALYSIS' }
  | { type: 'SELECT_REGION'; region: string }
  | { type: 'SELECT_KPI'; kpiType: string }
  | { type: 'REQUEST_ANALYSIS' }
  | { type: 'SHOW_RESULT' }
  | { type: 'TOGGLE_DEEP_DIVE'; wantDeepDive: boolean }
  | { type: 'SELECT_DEEP_DIMENSION'; dimension: string }
  | { type: 'RESET_FLOW' };

export type ChartData = {
  title: string;
  subtitle: string;
  xAxis: string[];
  series: {
    name: string;
    values: number[];
  }[];
};

export type AnalysisResponse = {
  chart: ChartData;
  metricsSummary: {
    deltaPercent: number;
    direction: 'up' | 'down';
    keyDrivers: string[];
  };
  deepDiveOptions: string[];
};

export type Message = {
  id: string;
  type: 'system' | 'user';
  content: string;
  timestamp: Date;
};
