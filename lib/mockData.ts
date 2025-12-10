import { ChartData } from '@/types/wizard';

interface AnalysisResponse {
  charts: ChartData[];
  metricsSummary: {
    deltaPercent: number;
    direction: 'up' | 'down';
    keyDrivers: string[];
  };
  deepDiveOptions: string[];
  followUpActions: string[];
}

export const getMockChartData = (kpiType: string, region: string): AnalysisResponse => {
  const baseData: Record<string, AnalysisResponse> = {
    'Store sales': {
      charts: [
        {
          type: 'bar',
          title: `Store Sales Trend - ${region}`,
          subtitle: "Quarterly sales (USD '000) – ~9.5% YoY increase",
          xAxis: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
          series: [
            { name: '2024', values: [120, 130, 140, 152] },
            { name: '2023', values: [110, 120, 130, 135] },
          ],
        },
        {
          type: 'line',
          title: `Store Sales Growth Trend - ${region}`,
          subtitle: 'Monthly sales progression (2023 vs 2024)',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            { name: '2024', values: [38, 42, 40, 44, 46, 45, 47, 48, 47, 49, 51, 50] },
            { name: '2023', values: [35, 38, 37, 40, 42, 41, 43, 44, 43, 45, 47, 46] },
          ],
        },
        {
          type: 'pie',
          title: `Store Sales Distribution by Category`,
          subtitle: 'Percentage of revenue by product category',
          xAxis: ['Beverages', 'Snacks', 'Dairy', 'Frozen Goods', 'Other'],
          series: [
            { name: 'Share %', values: [32, 25, 18, 15, 10] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 9.5,
        direction: 'up',
        keyDrivers: [
          'Beverage segment sales grew ~12%',
          'Q2 trade promotions boosted basket size by 8% [oai_citation:7‡lingarogroup.com](https://lingarogroup.com/blog/when-discounts-pay-off-how-to-measure-the-effectiveness-of-trade-promotions#:~:text=,loyalty)',
          'Opening of 7 new stores added ~15% to sales',
        ],
      },
      deepDiveOptions: ['Store location', 'Product category', 'Customer segment', 'Sales channel'],
      followUpActions: [
        'Design improvement plans for underperforming stores',
        'Refine sales forecasts with updated trends',
        'Identify new markets for expansion',
        'Analyze another KPI',
      ],
    },
    'Overall sales': {
      charts: [
        {
          type: 'bar',
          title: `Overall Sales Performance - ${region}`,
          subtitle: 'Year-to-date revenue up 8.4% vs last year',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            { name: '2024', values: [450, 480, 510, 530, 560, 590, 580, 600, 640, 650, 650, 900] },
            { name: '2023', values: [420, 445, 470, 495, 520, 545, 560, 580, 600, 650, 700, 600] },
          ],
        },
        {
          type: 'line',
          title: `Sales Growth Trajectory - ${region}`,
          subtitle: 'Cumulative revenue by month (2023 vs 2024)',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            { name: '2024 Cumulative', values: [450, 930, 1440, 1970, 2530, 3120, 3700, 4300, 4940, 5590, 6240, 7140] },
            { name: '2023 Cumulative', values: [420, 865, 1335, 1830, 2350, 2895, 3455, 4035, 4635, 5285, 5985, 6585] },
          ],
        },
        {
          type: 'pie',
          title: `Revenue Distribution by Channel`,
          subtitle: 'Share of total sales by channel',
          xAxis: ['Retail Stores', 'E-commerce', 'Wholesale', 'B2B Direct', 'Other'],
          series: [
            { name: 'Revenue %', values: [45, 28, 15, 8, 4] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 8.4,
        direction: 'up',
        keyDrivers: [
          'New product launches drove ~15% of the growth [oai_citation:8‡corporatefinanceinstitute.com](https://corporatefinanceinstitute.com/resources/financial-modeling/business-drivers/#:~:text=,Efficiency%20rates%20and%20downtime)',
          'E-commerce channel sales grew ~22%',
          'New B2B partnerships expanded sales by ~18%',
        ],
      },
      deepDiveOptions: ['Product line', 'Sales channel', 'Region', 'Customer type'],
      followUpActions: [
        'Develop growth plan for next quarter',
        'Optimize channel mix for higher ROI',
        'Launch targeted marketing initiatives',
        'Analyze another KPI',
      ],
    },
    'Joint business planning': {
      charts: [
        {
          type: 'bar',
          title: `JBP Initiative Performance - ${region}`,
          subtitle: 'Joint initiatives met/exceeded targets (~9% above)',
          xAxis: ['Initiative A', 'Initiative B', 'Initiative C', 'Initiative D'],
          series: [
            { name: 'Actual', values: [88, 95, 92, 105] },
            { name: 'Target', values: [80, 85, 90, 95] },
          ],
        },
        {
          type: 'line',
          title: `JBP Achievement Timeline`,
          subtitle: 'Monthly progress vs targets',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          series: [
            { name: 'Achievement %', values: [85, 88, 92, 95, 98, 102] },
            { name: 'Target %', values: [90, 90, 90, 95, 95, 100] },
          ],
        },
        {
          type: 'pie',
          title: `JBP Budget Allocation`,
          subtitle: 'Distribution of investment across initiatives',
          xAxis: ['Trade Marketing', 'Co-op Advertising', 'Merchandising', 'Training', 'Technology'],
          series: [
            { name: 'Budget %', values: [35, 25, 20, 12, 8] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 9,
        direction: 'up',
        keyDrivers: [
          'Retail partner collaboration boosted Initiative D',
          'Forecast accuracy improved ~15%',
          'Enhanced supply chain coordination',
        ],
      },
      deepDiveOptions: ['Partner', 'Initiative type', 'Timeline', 'Investment category'],
      followUpActions: [
        'Develop action plans for underperforming initiatives',
        'Identify new joint venture opportunities',
        'Prepare QBR presentation with updated metrics',
        'Analyze another KPI',
      ],
    },
    'Channel sales': {
      charts: [
        {
          type: 'bar',
          title: `Channel Sales Comparison - ${region}`,
          subtitle: 'E-commerce leads growth (18% increase)',
          xAxis: ['Retail', 'E-commerce', 'Wholesale', 'Direct'],
          series: [
            { name: '2024', values: [340, 180, 120, 85] },
            { name: '2023', values: [330, 152, 115, 80] },
          ],
        },
        {
          type: 'line',
          title: `Channel Growth Trends`,
          subtitle: 'Monthly performance by channel',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          series: [
            { name: 'Retail', values: [110, 112, 115, 113, 116, 118] },
            { name: 'E-commerce', values: [45, 50, 55, 58, 62, 68] },
            { name: 'Wholesale', values: [38, 39, 40, 41, 40, 42] },
          ],
        },
        {
          type: 'pie',
          title: `Channel Market Share`,
          subtitle: 'Percentage of total sales volume',
          xAxis: ['Retail', 'E-commerce', 'Wholesale', 'Direct', 'Other'],
          series: [
            { name: 'Market Share %', values: [47, 24, 16, 11, 2] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 7.1,
        direction: 'up',
        keyDrivers: [
          'E-commerce channel grew ~18%',
          'Retail channel steady at ~3% growth',
          '5 new wholesale partnerships signed',
        ],
      },
      deepDiveOptions: ['Channel', 'Product category', 'Customer demographics', 'Geography'],
      followUpActions: [
        'Formulate omnichannel strategy to boost sales',
        'Enhance e-commerce platform for conversions',
        'Pinpoint and address weak channels',
        'Analyze another KPI',
      ],
    },
    'Online sales': {
      charts: [
        {
          type: 'bar',
          title: `Online Sales Performance - ${region}`,
          subtitle: 'This month vs last: ~22% sales increase',
          xAxis: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          series: [
            { name: 'This Month', values: [36, 42, 50, 55] },
            { name: 'Last Month', values: [30, 35, 40, 45] },
          ],
        },
        {
          type: 'line',
          title: `Daily Online Traffic & Conversions`,
          subtitle: 'Avg daily visitors and conversion rate (last 7 days)',
          xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          series: [
            { name: 'Visitors (k)', values: [12, 15, 14, 16, 18, 22, 20] },
            { name: 'Conversion Rate (%)', values: [3.2, 3.5, 3.4, 3.8, 4.1, 4.5, 4.2] },
          ],
        },
        {
          type: 'pie',
          title: `Online Sales by Device`,
          subtitle: 'Share of online purchases by device type',
          xAxis: ['Mobile', 'Desktop', 'Tablet', 'Other'],
          series: [
            { name: 'Device Share %', values: [58, 32, 8, 2] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 22,
        direction: 'up',
        keyDrivers: [
          'Mobile app sales up ~30%',
          'Social campaigns drove 40% of traffic',
          'Average order value increased by 12%',
        ],
      },
      deepDiveOptions: ['Platform', 'Device type', 'Traffic source', 'Product category'],
      followUpActions: [
        'Optimize mobile checkout to improve conversions',
        'Plan targeted digital marketing campaigns',
        'Analyze cart abandonment and recovery',
        'Analyze another KPI',
      ],
    },
    'Campaign performance': {
      charts: [
        {
          type: 'bar',
          title: `Campaign ROI Performance - ${region}`,
          subtitle: 'Recent campaigns beat ROI targets by ~15%',
          xAxis: ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4'],
          series: [
            { name: 'ROI (%)', values: [120, 140, 160, 155] },
            { name: 'Target (%)', values: [100, 120, 140, 140] },
          ],
        },
        {
          type: 'line',
          title: `Campaign Engagement Over Time`,
          subtitle: 'Weekly reach and engagement',
          xAxis: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          series: [
            { name: 'Reach (k)', values: [250, 310, 385, 420, 475, 520] },
            { name: 'Engagement Rate (%)', values: [4.2, 4.8, 5.2, 5.8, 6.1, 6.5] },
          ],
        },
        {
          type: 'pie',
          title: `Campaign Budget Allocation`,
          subtitle: 'Marketing spend by channel',
          xAxis: ['Social Media', 'TV/Radio', 'Digital Ads', 'Print', 'Events'],
          series: [
            { name: 'Budget %', values: [38, 28, 20, 8, 6] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 15,
        direction: 'up',
        keyDrivers: [
          'Video ads saw 25% higher engagement',
          'Influencer partnerships delivered 30% lift',
          'Retargeting campaigns drove 35% conversions lift',
        ],
      },
      deepDiveOptions: ['Campaign type', 'Channel', 'Audience segment', 'Creative format'],
      followUpActions: [
        'Draft integrated marketing plan for Q2',
        'Reallocate budget to high-ROI channels',
        'Plan A/B tests for new creatives',
        'Analyze another KPI',
      ],
    },
    'Trade promotions impact': {
      charts: [
        {
          type: 'bar',
          title: `Trade Promotion Effectiveness - ${region}`,
          subtitle: 'Promotions drove ~12% incremental sales lift',
          xAxis: ['Promo 1', 'Promo 2', 'Promo 3', 'Promo 4'],
          series: [
            { name: 'Lift %', values: [10, 12, 15, 14] },
            { name: 'Baseline %', values: [8, 8, 10, 10] },
          ],
        },
        {
          type: 'line',
          title: `Promotion ROI Timeline`,
          subtitle: 'Monthly ROI on promotional spend',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          series: [
            { name: 'ROI (%)', values: [145, 152, 168, 175, 182, 195] },
            { name: 'Target ROI (%)', values: [150, 150, 160, 160, 170, 180] },
          ],
        },
        {
          type: 'pie',
          title: `Promotion Type Effectiveness`,
          subtitle: 'Sales lift by promotion type',
          xAxis: ['BOGO', 'Pct Off', 'Bundle', 'Cashback', 'Other'],
          series: [
            { name: 'Effectiveness %', values: [32, 28, 22, 12, 6] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 12,
        direction: 'up',
        keyDrivers: [
          'BOGO deals delivered 32% lift',
          'Premium brand promos up 18%',
          'Holiday timing maximized promo impact',
        ],
      },
      deepDiveOptions: ['Promotion type', 'Product', 'Retailer', 'Timing'],
      followUpActions: [
        'Plan next-quarter promotion calendar around key events',
        'Implement trade promotion optimization strategy',
        'Generate ROI analysis by promotion type',
        'Analyze another KPI',
      ],
    },
  };

  return baseData[kpiType] || baseData['Store sales'];
};

export const getDeepDiveData = (
  kpiType: string,
  region: string,
  dimension: string
): ChartData[] => {
  return [
    {
      type: 'bar',
      title: `${kpiType} by ${dimension} - ${region}`,
      subtitle: `Detailed breakdown by ${dimension.toLowerCase()}`,
      xAxis: ['Segment A', 'Segment B', 'Segment C', 'Segment D', 'Segment E'],
      series: [
        { name: '2024', values: [85, 92, 78, 95, 88] },
        { name: '2023', values: [78, 85, 72, 88, 82] },
      ],
    },
    {
      type: 'line',
      title: `${dimension} Growth Trend`,
      subtitle: 'Monthly trend by segment',
      xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      series: [
        { name: 'Segment A', values: [75, 78, 80, 82, 83, 85, 84, 85] },
        { name: 'Segment B', values: [82, 85, 87, 89, 90, 92, 91, 92] },
        { name: 'Segment C', values: [70, 72, 74, 76, 77, 78, 77, 78] },
        { name: 'Segment D', values: [85, 88, 90, 92, 93, 95, 94, 95] },
      ],
    },
    {
      type: 'pie',
      title: `Market Share by ${dimension}`,
      subtitle: 'Contribution to total performance',
      xAxis: ['Segment A', 'Segment B', 'Segment C', 'Segment D', 'Segment E'],
      series: [
        { name: 'Share %', values: [28, 32, 18, 15, 7] },
      ],
    },
  ];
};