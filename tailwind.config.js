/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      colors: {
        zinc: {
          950: '#09090b',
        },
        accent: {
          DEFAULT: '#6ee7b7',
          dim: '#34d399',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(110, 231, 183, 0.15)',
      },
    },
  },
  plugins: [],
}
