/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#050505', // Deepest black
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1c1c2e',
          // Accents
          cyan: '#00f3ff',
          purple: '#bc13fe',
          slate: '#64748b',
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1c1c2e 1px, transparent 1px), linear-gradient(to bottom, #1c1c2e 1px, transparent 1px)",
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}