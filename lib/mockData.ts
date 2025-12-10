import { AnalysisResponse, ChartData } from '@/types/wizard';

export const getMockChartData = (kpiType: string, region: string): AnalysisResponse => {
  const baseData: Record<string, AnalysisResponse> = {
    'Store sales': {
      chart: {
        title: `Store sales in ${region} – Year-over-Year`,
        subtitle: 'Sales are up 8.4% vs last year.',
        xAxis: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
          {
            name: '2024',
            values: [120, 135, 142, 150],
          },
          {
            name: '2023',
            values: [110, 120, 130, 138],
          },
        ],
      },
      metricsSummary: {
        deltaPercent: 8.4,
        direction: 'up',
        keyDrivers: [
          'Beverages category grew 12%',
          'Trade promotions in Q2 increased basket size',
        ],
      },
      deepDiveOptions: ['Store', 'Category', 'Customer segment', 'Channel'],
    },
    'Overall sales': {
      chart: {
        title: `Overall sales in ${region}`,
        subtitle: 'Total revenue increased by 6.2% year-over-year.',
        xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
          {
            name: '2024',
            values: [450, 480, 510, 530, 560, 590],
          },
          {
            name: '2023',
            values: [420, 445, 470, 495, 520, 545],
          },
        ],
      },
      metricsSummary: {
        deltaPercent: 6.2,
        direction: 'up',
        keyDrivers: [
          'New product launches drove 15% growth',
          'Digital channels grew 22%',
        ],
      },
      deepDiveOptions: ['Product line', 'Channel', 'Region breakdown', 'Customer type'],
    },
    'Joint business planning': {
      chart: {
        title: `JBP Performance in ${region}`,
        subtitle: 'Joint initiatives exceeded targets by 11%.',
        xAxis: ['Initiative A', 'Initiative B', 'Initiative C', 'Initiative D'],
        series: [
          {
            name: 'Actual',
            values: [88, 95, 92, 105],
          },
          {
            name: 'Target',
            values: [80, 85, 90, 95],
          },
        ],
      },
      metricsSummary: {
        deltaPercent: 11,
        direction: 'up',
        keyDrivers: [
          'Strong retailer collaboration on Initiative D',
          'Improved forecasting accuracy',
        ],
      },
      deepDiveOptions: ['Partner', 'Initiative type', 'Timeline', 'Investment level'],
    },
    'Channel sales': {
      chart: {
        title: `Channel sales breakdown in ${region}`,
        subtitle: 'E-commerce channel shows strongest growth at 18%.',
        xAxis: ['Retail', 'E-commerce', 'Wholesale', 'Direct'],
        series: [
          {
            name: '2024',
            values: [340, 180, 120, 85],
          },
          {
            name: '2023',
            values: [330, 152, 115, 80],
          },
        ],
      },
      metricsSummary: {
        deltaPercent: 7.8,
        direction: 'up',
        keyDrivers: [
          'E-commerce channel grew 18.4%',
          'Retail channel steady at 3% growth',
        ],
      },
      deepDiveOptions: ['Channel', 'Product category', 'Customer demographics', 'Geography'],
    },
    'Online sales': {
      chart: {
        title: `Online sales performance in ${region}`,
        subtitle: 'Digital sales surged by 22% this quarter.',
        xAxis: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        series: [
          {
            name: 'This Month',
            values: [42, 48, 55, 62],
          },
          {
            name: 'Last Month',
            values: [35, 38, 42, 48],
          },
        ],
      },
      metricsSummary: {
        deltaPercent: 22,
        direction: 'up',
        keyDrivers: [
          'Mobile app conversions up 30%',
          'Social media campaigns drove 40% of traffic',
        ],
      },
      deepDiveOptions: ['Platform', 'Device type', 'Traffic source', 'Product category'],
    },
    'Campaign performance': {
      chart: {
        title: `Marketing campaign performance in ${region}`,
        subtitle: 'Q4 campaigns delivered 15% better ROI.',
        xAxis: ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4'],
        series: [
          {
            name: 'ROI %',
            values: [125, 138, 145, 152],
          },
          {
            name: 'Target %',
            values: [120, 120, 130, 130],
          },
        ],
      },
      metricsSummary: {
        deltaPercent: 15,
        direction: 'up',
        keyDrivers: [
          'Video content outperformed by 25%',
          'Influencer partnerships exceeded expectations',
        ],
      },
      deepDiveOptions: ['Campaign type', 'Channel', 'Audience segment', 'Creative format'],
    },
    'Trade promotions impact': {
      chart: {
        title: `Trade promotions impact in ${region}`,
        subtitle: 'Promotional activities drove 12% incremental sales.',
        xAxis: ['Promo 1', 'Promo 2', 'Promo 3', 'Promo 4'],
        series: [
          {
            name: 'Lift %',
            values: [10, 12, 15, 14],
          },
          {
            name: 'Baseline',
            values: [8, 8, 10, 10],
          },
        ],
      },
      metricsSummary: {
        deltaPercent: 12,
        direction: 'up',
        keyDrivers: [
          'BOGO promotions most effective',
          'Premium brands saw 18% lift during promotions',
        ],
      },
      deepDiveOptions: ['Promotion type', 'Product', 'Retailer', 'Timing'],
    },
  };

  return baseData[kpiType] || baseData['Store sales'];
};

export const getDeepDiveData = (
  kpiType: string,
  region: string,
  dimension: string
): ChartData => {
  return {
    title: `${kpiType} by ${dimension} in ${region}`,
    subtitle: `Detailed breakdown showing ${dimension.toLowerCase()} performance.`,
    xAxis: ['Segment A', 'Segment B', 'Segment C', 'Segment D'],
    series: [
      {
        name: '2024',
        values: [85, 92, 78, 95],
      },
      {
        name: '2023',
        values: [78, 85, 72, 88],
      },
    ],
  };
};
