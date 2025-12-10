import { AnalysisResponse, ChartData } from '@/types/wizard';

export const getMockChartData = (kpiType: string, region: string): AnalysisResponse => {
  const baseData: Record<string, AnalysisResponse> = {
    'Store sales': {
      charts: [
        {
          type: 'bar',
          title: `Store Sales Trend - ${region}`,
          subtitle: 'Quarterly comparison showing 8.4% growth',
          xAxis: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
          series: [
            { name: '2024', values: [120, 135, 142, 150] },
            { name: '2023', values: [110, 120, 130, 138] },
          ],
        },
        {
          type: 'line',
          title: `Store Sales Progressive Growth`,
          subtitle: 'Month-over-month progression',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            { name: '2024', values: [38, 42, 40, 44, 46, 45, 47, 48, 47, 49, 51, 50] },
            { name: '2023', values: [35, 38, 37, 40, 42, 41, 43, 44, 43, 45, 47, 46] },
          ],
        },
        {
          type: 'pie',
          title: `Store Sales Distribution by Category`,
          subtitle: 'Revenue share across product categories',
          xAxis: ['Beverages', 'Snacks', 'Dairy', 'Frozen', 'Others'],
          series: [
            { name: 'Share %', values: [32, 25, 18, 15, 10] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 8.4,
        direction: 'up',
        keyDrivers: [
          'Beverages category grew 12%',
          'Trade promotions in Q2 increased basket size by 8%',
          'New store openings contributed 15% of growth',
        ],
      },
      deepDiveOptions: ['Store Location', 'Category', 'Customer segment', 'Channel'],
      followUpActions: [
        'Create improvement plan for underperforming stores',
        'Generate detailed sales forecast',
        'Identify expansion opportunities',
        'Analyze competitor impact',
      ],
    },
    'Overall sales': {
      charts: [
        {
          type: 'bar',
          title: `Overall Sales Performance - ${region}`,
          subtitle: 'Total revenue increased by 6.2% year-over-year',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          series: [
            { name: '2024', values: [450, 480, 510, 530, 560, 590] },
            { name: '2023', values: [420, 445, 470, 495, 520, 545] },
          ],
        },
        {
          type: 'line',
          title: `Sales Growth Trajectory`,
          subtitle: 'Cumulative revenue growth over 12 months',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            { name: '2024 Cumulative', values: [450, 930, 1440, 1970, 2530, 3120, 3740, 4380, 5040, 5720, 6420, 7140] },
            { name: '2023 Cumulative', values: [420, 865, 1335, 1830, 2350, 2895, 3460, 4045, 4650, 5275, 5920, 6585] },
          ],
        },
        {
          type: 'pie',
          title: `Revenue Distribution by Channel`,
          subtitle: 'Channel-wise revenue contribution',
          xAxis: ['Retail Stores', 'E-commerce', 'Wholesale', 'Direct B2B', 'Others'],
          series: [
            { name: 'Revenue %', values: [45, 28, 15, 8, 4] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 6.2,
        direction: 'up',
        keyDrivers: [
          'New product launches drove 15% growth',
          'Digital channels grew 22%',
          'B2B partnerships expanded by 18%',
        ],
      },
      deepDiveOptions: ['Product line', 'Channel', 'Region breakdown', 'Customer type'],
      followUpActions: [
        'Develop growth strategy for next quarter',
        'Optimize channel mix for maximum ROI',
        'Create targeted marketing campaigns',
        'Forecast Q2 revenue projections',
      ],
    },
    'Joint business planning': {
      charts: [
        {
          type: 'bar',
          title: `JBP Initiative Performance - ${region}`,
          subtitle: 'Joint initiatives exceeded targets by 11%',
          xAxis: ['Initiative A', 'Initiative B', 'Initiative C', 'Initiative D'],
          series: [
            { name: 'Actual', values: [88, 95, 92, 105] },
            { name: 'Target', values: [80, 85, 90, 95] },
          ],
        },
        {
          type: 'line',
          title: `JBP Performance Timeline`,
          subtitle: 'Monthly progress tracking',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          series: [
            { name: 'Achievement %', values: [85, 88, 92, 95, 98, 102] },
            { name: 'Target %', values: [90, 90, 90, 95, 95, 100] },
          ],
        },
        {
          type: 'pie',
          title: `JBP Investment Distribution`,
          subtitle: 'Budget allocation across initiatives',
          xAxis: ['Trade Marketing', 'Co-op Advertising', 'Merchandising', 'Training', 'Technology'],
          series: [
            { name: 'Budget %', values: [35, 25, 20, 12, 8] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 11,
        direction: 'up',
        keyDrivers: [
          'Strong retailer collaboration on Initiative D',
          'Improved forecasting accuracy by 15%',
          'Enhanced supply chain coordination',
        ],
      },
      deepDiveOptions: ['Partner', 'Initiative type', 'Timeline', 'Investment level'],
      followUpActions: [
        'Develop action plan for underperforming initiatives',
        'Propose new joint ventures with key partners',
        'Create quarterly business review presentation',
        'Optimize budget allocation for next period',
      ],
    },
    'Channel sales': {
      charts: [
        {
          type: 'bar',
          title: `Channel Sales Comparison - ${region}`,
          subtitle: 'E-commerce shows strongest growth at 18%',
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
          subtitle: 'Distribution of total sales volume',
          xAxis: ['Retail', 'E-commerce', 'Wholesale', 'Direct', 'Others'],
          series: [
            { name: 'Market Share %', values: [47, 24, 16, 11, 2] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 7.8,
        direction: 'up',
        keyDrivers: [
          'E-commerce channel grew 18.4%',
          'Retail channel steady at 3% growth',
          'Wholesale partnerships expanded to 5 new distributors',
        ],
      },
      deepDiveOptions: ['Channel', 'Product category', 'Customer demographics', 'Geography'],
      followUpActions: [
        'Create omnichannel strategy to boost sales',
        'Develop e-commerce optimization plan',
        'Identify underperforming channels for improvement',
        'Forecast channel-specific targets for next quarter',
      ],
    },
    'Online sales': {
      charts: [
        {
          type: 'bar',
          title: `Online Sales Performance - ${region}`,
          subtitle: 'Digital sales surged by 22% this quarter',
          xAxis: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          series: [
            { name: 'This Month', values: [42, 48, 55, 62] },
            { name: 'Last Month', values: [35, 38, 42, 48] },
          ],
        },
        {
          type: 'line',
          title: `Daily Online Traffic & Conversions`,
          subtitle: 'Daily average over the past month',
          xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          series: [
            { name: 'Visitors (000s)', values: [12, 15, 14, 16, 18, 22, 20] },
            { name: 'Conversions %', values: [3.2, 3.5, 3.4, 3.8, 4.1, 4.5, 4.2] },
          ],
        },
        {
          type: 'pie',
          title: `Online Sales by Device`,
          subtitle: 'Customer device preferences',
          xAxis: ['Mobile', 'Desktop', 'Tablet', 'Others'],
          series: [
            { name: 'Device Share %', values: [58, 32, 8, 2] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 22,
        direction: 'up',
        keyDrivers: [
          'Mobile app conversions up 30%',
          'Social media campaigns drove 40% of traffic',
          'Average order value increased by 12%',
        ],
      },
      deepDiveOptions: ['Platform', 'Device type', 'Traffic source', 'Product category'],
      followUpActions: [
        'Optimize mobile experience for higher conversions',
        'Create digital marketing campaign strategy',
        'Analyze cart abandonment and create recovery plan',
        'Develop personalization strategy for online shoppers',
      ],
    },
    'Campaign performance': {
      charts: [
        {
          type: 'bar',
          title: `Campaign ROI Performance - ${region}`,
          subtitle: 'Q4 campaigns delivered 15% better ROI',
          xAxis: ['Campaign 1', 'Campaign 2', 'Campaign 3', 'Campaign 4'],
          series: [
            { name: 'ROI %', values: [125, 138, 145, 152] },
            { name: 'Target %', values: [120, 120, 130, 130] },
          ],
        },
        {
          type: 'line',
          title: `Campaign Performance Over Time`,
          subtitle: 'Weekly engagement and reach metrics',
          xAxis: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          series: [
            { name: 'Reach (000s)', values: [250, 310, 385, 420, 475, 520] },
            { name: 'Engagement %', values: [4.2, 4.8, 5.2, 5.8, 6.1, 6.5] },
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
          'Video content outperformed by 25%',
          'Influencer partnerships exceeded expectations',
          'Retargeting campaigns showed 35% lift in conversions',
        ],
      },
      deepDiveOptions: ['Campaign type', 'Channel', 'Audience segment', 'Creative format'],
      followUpActions: [
        'Develop integrated marketing plan for Q2',
        'Optimize campaign spend based on performance',
        'Create A/B testing strategy for creative assets',
        'Generate comprehensive campaign effectiveness report',
      ],
    },
    'Trade promotions impact': {
      charts: [
        {
          type: 'bar',
          title: `Trade Promotion Effectiveness - ${region}`,
          subtitle: 'Promotional activities drove 12% incremental sales',
          xAxis: ['Promo 1', 'Promo 2', 'Promo 3', 'Promo 4'],
          series: [
            { name: 'Lift %', values: [10, 12, 15, 14] },
            { name: 'Baseline', values: [8, 8, 10, 10] },
          ],
        },
        {
          type: 'line',
          title: `Promotion ROI Timeline`,
          subtitle: 'Return on promotional investment',
          xAxis: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          series: [
            { name: 'ROI %', values: [145, 152, 168, 175, 182, 195] },
            { name: 'Target %', values: [150, 150, 160, 160, 170, 180] },
          ],
        },
        {
          type: 'pie',
          title: `Promotion Types Performance`,
          subtitle: 'Sales lift by promotion mechanism',
          xAxis: ['BOGO', 'Percentage Off', 'Bundle Deals', 'Cashback', 'Others'],
          series: [
            { name: 'Effectiveness %', values: [32, 28, 22, 12, 6] },
          ],
        },
      ],
      metricsSummary: {
        deltaPercent: 12,
        direction: 'up',
        keyDrivers: [
          'BOGO promotions most effective with 32% lift',
          'Premium brands saw 18% lift during promotions',
          'Promotional timing optimized for peak shopping periods',
        ],
      },
      deepDiveOptions: ['Promotion type', 'Product', 'Retailer', 'Timing'],
      followUpActions: [
        'Design optimal promotion calendar for next quarter',
        'Develop trade promotion optimization strategy',
        'Create ROI analysis for each promotion type',
        'Generate recommendations for underperforming promotions',
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
  // Return multiple detailed charts for deep dive analysis
  return [
    {
      type: 'bar',
      title: `${kpiType} by ${dimension} - ${region}`,
      subtitle: `Detailed performance breakdown across ${dimension.toLowerCase()}`,
      xAxis: ['Segment A', 'Segment B', 'Segment C', 'Segment D', 'Segment E'],
      series: [
        { name: '2024', values: [85, 92, 78, 95, 88] },
        { name: '2023', values: [78, 85, 72, 88, 82] },
      ],
    },
    {
      type: 'line',
      title: `${dimension} Growth Trend`,
      subtitle: 'Monthly progression by segment',
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
