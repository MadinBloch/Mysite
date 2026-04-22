/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
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
    },
  },
  plugins: [],
}
