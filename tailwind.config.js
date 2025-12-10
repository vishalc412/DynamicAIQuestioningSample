/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: '#050612',
          panel: '#151824',
          'chat-user': '#1e2738',
          'chat-system': '#101827',
        },
        accent: {
          primary: '#4ade80',
          secondary: '#38bdf8',
        },
        text: {
          primary: '#f9fafb',
          secondary: '#9ca3af',
          muted: '#6b7280',
        },
        border: {
          soft: 'rgba(148, 163, 184, 0.24)',
        },
        chip: {
          bg: '#111827',
          active: 'rgba(74, 222, 128, 0.14)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'pulse-glow-thinking': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'bounce-dots': {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-glow': 'pulse-glow 1.2s ease-in-out infinite',
        'pulse-glow-thinking': 'pulse-glow-thinking 0.8s ease-in-out infinite',
        'bounce-dots': 'bounce-dots 0.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
