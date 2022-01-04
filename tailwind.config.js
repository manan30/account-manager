module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: '0.65rem',
        'xxs-badge': '0.5rem'
      },
      gridTemplateColumns: {
        expenses: '0.5fr 1fr 0.5fr'
      },
      maxHeight: {
        modal: '66.666667%'
      },
      minWidth: {
        button: '6rem',
        toast: '18rem'
      },
      maxWidth: {
        notification: '20rem'
      },
      zIndex: {
        75: 75
      },
      height: {
        main: 'calc(100% - 4.8rem)'
      },
      rotate: {
        270: '270deg'
      },
      keyframes: {
        'slide-in-top': {
          '0%': { transform: 'translateY(-80%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'toast-entry': {
          '0%': { transform: 'translateY(80%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'toast-exit': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(250%)' }
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(80%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'slide-out-right': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateX(80%)' }
        }
      },
      animation: {
        'slide-in-top': 'slide-in-top 0.8s ease-in-out',
        'slide-in-bottom': 'slide-in-bottom 0.8s ease-in-out',
        'slide-out-bottom': 'slide-out-bottom 0.8s ease-in-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-out-right': 'slide-out-right 0.5s ease-in',
        'toast-entry': 'toast-entry 0.8s ease-in-out',
        'toast-exit': 'toast-exit 0.8s ease-in-out'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};
