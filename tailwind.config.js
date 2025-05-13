/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: '"Bujangnim_nunchi"',
              fontSize: '1.25em',
              fontWeight: '400',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            h2: {
              fontFamily: '"Bujangnim_nunchi"',
              fontSize: '1.00em',
              fontWeight: '400',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            p: {
              fontFamily: '"Bujangnim_nunchi"',
              fontSize: '0.80em',                        // 단락 폰트 크기 설정
              lineHeight: '1.5',                         // 줄 간격 설정
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            // 다른 텍스트 요소도 설정할 수 있습니다
            li: {
              fontSize: '0.80em',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
          },
        },
      },
      fontFamily: {
/*         'cute': ['"Cute Font"', 'cursive'], */
        'noto': ['"Noto Sans KR"', 'sans-serif'],
        'bujang': ['"Bujangnim_nunchi"', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}