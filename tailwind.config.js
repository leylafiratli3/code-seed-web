module.exports = {
  content: [
    "./**/*.{html,js}",
    "./projects/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8dba90',
        secondary: '#5a7d5c',
        accent: '#D2B48C',
      },
      fontFamily: {
        'sans': ['Satoshi', 'sans-serif'],
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