module.exports = {
  purge: {
    content: ['./src/**/*.tsx', './public/index.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        table: '40rem',
        select: '10rem'
      },
      minHeight: {
        c: '8rem'
      },
      width: {
        select: 'calc(100% - 2rem)',
        notification: '20rem'
      },
      animation: {
        'notification-entry': 'notification-entry 0.5s ease-out',
        'notification-exit': 'notification-exit 0.5s ease-in',

        'modal-entry': 'modal-entry 0.6s ease-out',
        'modal-exit': 'modal-exit 0.6s ease-out'
      },
      keyframes: {
        'notification-entry': {
          entry: {
            '0%': {
              transform: 'translateX(20rem)'
            },
            '100%': {
              transform: 'translateX(0)'
            }
          },
          exit: {
            '0%': {
              transform: 'translateX(0)'
            },
            '100%': {
              transform: 'translateX(30rem)'
            }
          }
        },
        'modal-entry': {
          '0%': {
            transform: 'translateY(20rem)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
