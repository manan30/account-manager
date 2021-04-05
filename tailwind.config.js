module.exports = {
  purge: ['./index.html', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        modal: '66.666667%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
