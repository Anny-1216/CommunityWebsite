/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1628',
          mid: '#112240',
          light: '#1a3a6b',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c97a',
          pale: '#f5e6c0',
        },
        muted: '#8a9bb5',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
