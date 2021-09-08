module.exports = {
  purge: ['./index.html', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        modal: '66.666667%'
      },
      height: {
        main: 'calc(100% - 4.8rem)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
