module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#8dba90',
        secondary: '#5a7d5c',
        accent: '#D2B48C',
      },
      fontFamily: {
        'fira': ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      })
    },
  ],
}