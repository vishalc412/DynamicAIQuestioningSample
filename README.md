# FMCG Sales & JBP Assistant

A modern, AI-powered conversational interface for analyzing FMCG (Fast-Moving Consumer Goods) sales and Joint Business Planning (JBP) metrics in North America.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## Features

- **Conversational Wizard Interface**: Natural conversation flow for sales analysis
- **Modern Dark Theme**: Professional dark UI with neon accent colors
- **Animated Brain Visualization**: Dynamic AI brain with idle and thinking states
- **Interactive Charts**: Beautiful, responsive charts powered by Recharts
- **Regional Focus**: North America-specific sales analysis
- **Multiple KPI Types**:
  - Sales KPIs (Store sales, Overall sales, JBP, Channel sales, Online sales)
  - Marketing KPIs (Campaign performance, Trade promotions)
- **Deep Dive Analysis**: Drill down into specific dimensions (Store, Category, Segment, Channel)
- **Smooth Animations**: Modern transitions and micro-interactions

## Tech Stack

- **Framework**: Next.js 14.2 (App Router)
- **Language**: TypeScript 5.4
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts 2.12
- **Animations**: Framer Motion 11.2
- **Font**: Inter (Google Fonts)

## Project Structure

```
.
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page with wizard logic
├── components/
│   ├── BrainAnimation.tsx   # Animated AI brain SVG
│   ├── BrainPanel.tsx       # Right panel with brain visualization
│   ├── ChartCard.tsx        # Chart display component
│   ├── ChoiceChipGroup.tsx  # Interactive choice chips
│   ├── ConversationPanel.tsx # Left panel with conversation
│   ├── InlineLoader.tsx     # Loading animation
│   └── MessageBubble.tsx    # Chat message bubbles
├── lib/
│   └── mockData.ts          # Mock data for charts and analysis
├── types/
│   └── wizard.ts            # TypeScript type definitions
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind configuration with custom theme
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- **Node.js**: 18.17 or later
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository** (or extract the files):

```bash
cd DynamicAIQuestioningSample
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Create environment file** (optional):

```bash
cp .env.local.example .env.local
```

4. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### User Flow

1. **Welcome Screen**: Click "Start analysis" to begin
2. **Region Selection**: Select "North America" (default)
3. **KPI Selection**: Choose from Sales or Marketing KPIs
4. **Analysis**: AI analyzes and displays a chart with insights
5. **Deep Dive** (optional): Drill down into specific dimensions
6. **New Analysis**: Start over with a fresh analysis

### Customization

#### Colors

Edit the color tokens in `tailwind.config.js`:

```javascript
colors: {
  app: {
    bg: '#050612',
    panel: '#151824',
    // ...
  },
  accent: {
    primary: '#4ade80',
    secondary: '#38bdf8',
  },
  // ...
}
```

#### Mock Data

Update chart data in `lib/mockData.ts` to match your data structure.

#### User Context

Change default user info in `app/page.tsx`:

```typescript
const initialState: WizardState = {
  step: 'welcome',
  name: 'Alex',        // Change name
  role: 'Sales Manager', // Change role
  isLoading: false,
};
```

## Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build and starts the server on port 3000.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- AWS (Amplify, EC2, ECS)
- Google Cloud Platform
- Azure
- Netlify
- Railway
- Render

## Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data streaming
- [ ] User authentication
- [ ] Multi-region support
- [ ] Export charts as PDF/PNG
- [ ] Custom date range selection
- [ ] Advanced filtering options
- [ ] Mobile responsive design
- [ ] Dark/light theme toggle
- [ ] Accessibility improvements (WCAG 2.1 AA)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For issues or questions, please open an issue in the GitHub repository.

## Acknowledgments

- Design spec based on modern FMCG sales analysis requirements
- Built with best practices from Next.js and React communities
- Inspired by modern AI assistant interfaces

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**