/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vats: {
          black: '#0B0B0B',
          charcoal: '#222222',
          surface: '#161616',
          border: '#2A2A2A',
          muted: '#858585',
          offwhite: '#F5F5F2',
          lime: '#C7FF35',
          limeHover: '#B2EB25',
          darkLime: '#97CC1C',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        sans: ['"Inter"', '"Manrope"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.25em',
        mega: '0.15em',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseLime: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      animation: {
        ticker: 'ticker 25s linear infinite',
        'pulse-lime': 'pulseLime 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
