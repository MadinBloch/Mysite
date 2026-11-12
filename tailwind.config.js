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
        zinc: { 950: '#0b101b' },
        accent: { DEFAULT: '#9eb3ff', dim: '#7c94f6' },
      },
      boxShadow: { glow: '0 0 40px rgba(158,179,255,.15)' },
    },
  },
  plugins: [],
}
