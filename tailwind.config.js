/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,vue}', './index.html'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        blue: '#1e3a8a',
        brown: '#43302b',
        gray: '#111827',
        green: '#14532d',
        pink: '#831843',
        purple: '#581c87',
        red: '#7f1d1d',
        white: '#fafafa',
        yellow: '#713f12'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
