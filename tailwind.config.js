/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--mono)'],
        sans: ['var(--display)'],
        display: ['var(--display)'],
      },
      colors: {
        ink: 'var(--ink)',
        panel: 'var(--panel)',
        line: 'var(--line)',
        foreground: 'var(--text)',
        muted: 'var(--muted)',
        zinc: {
          950: 'var(--ink)',
        },
        accent: {
          DEFAULT: 'var(--accent-text)',
          dim: 'var(--accent-text)',
        },
      },
    },
  },
  plugins: [],
}
