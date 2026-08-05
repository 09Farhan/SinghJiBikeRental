import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0e1a',
          800: '#111827',
          700: '#1f2937',
        },
        amber: {
          400: '#e8d56b',
          500: '#e0ca3c', // primary golden yellow
          600: '#b3a230',
        },
        yellow: {
          400: '#f0e394',
          500: '#e8d55a',
          600: '#e0ca3c',
        },
        brand: {
          orange: '#f97316',
          amber: '#fbbf24',
          gold: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-inter)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'neu': '4px 4px 10px rgba(0, 0, 0, 0.5), -2px -2px 10px rgba(255, 255, 255, 0.02)',
        'neu-pressed': 'inset 4px 4px 10px rgba(0, 0, 0, 0.5), inset -2px -2px 10px rgba(255, 255, 255, 0.03)',
        'glow': '0 0 20px rgba(224, 202, 60, 0.15)',
        'glow-strong': '0 0 30px rgba(224, 202, 60, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
