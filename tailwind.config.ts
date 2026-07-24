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
    },
  },
  plugins: [],
};

export default config;
