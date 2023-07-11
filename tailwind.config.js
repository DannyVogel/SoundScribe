/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      title: ['Dancing Script', 'cursive', 'sans-serif']
    },
    extend: {
      gridTemplateRows: {
        layout: '50px 1fr',
        soundBoard: '200px 50px 1fr'
      }
    }
  },
  plugins: []
}
