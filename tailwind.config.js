const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    'src/**/*.{ts,html}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
    colors: {
      yellow: '#ffdb0f',
      accent: '#282626',
      ...colors
    },
    fontFamily: {
      nunito: 'Nunito, sans-serif',
      openSans: 'Open Sans, sans-serif'
    }
  },
  plugins: [],
}
