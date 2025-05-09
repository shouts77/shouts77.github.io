/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: '"Cute Font", sans-serif',
              fontSize: '2.0em',
              fontWeight: '400',
              marginTop: '0',
              marginBottom: '0'
            },
            h2: {
              fontFamily: '"Cute Font", sans-serif',
              fontSize: '1.75em',
              fontWeight: '400',
              marginTop: '0',
              marginBottom: '0'
            },
            p: {
              marginTop: '0',
              marginBottom: '0'
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}