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
        zinc: { 950: '#0b0d12' },
        accent: { DEFAULT: '#b9f483', dim: '#a2df73' },
      },
      boxShadow: {
        glow: '0 0 40px rgba(185,244,131,.16)',
      }
    }
  },
  plugins: []
}
