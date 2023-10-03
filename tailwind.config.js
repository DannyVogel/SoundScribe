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
        soundBoard: '250px 50px 1fr',
        soundBoardLg: '400px 50px 1fr'
      },
      gridTemplateColumns: {
        actionBar: '1fr 100px 1fr',
        actionBarMD: '1fr 200px 1fr'
      }
    }
  },
  plugins: []
}
