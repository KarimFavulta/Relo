/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'reload-purple': {
          50: '#f3effb',
          100: '#e5daf7',
          200: '#cdb6ef',
          300: '#b28ae5',
          400: '#9a5fd9',
          500: '#8a2be2', // Primary color
          600: '#7722b5',
          700: '#5c1a8b',
          800: '#42135f',
          900: '#2d1b4e',
          950: '#1a0f2e',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};