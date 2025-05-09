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
              fontSize: '1.25em',
              fontWeight: '400',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            h2: {
              fontFamily: '"Cute Font", sans-serif',
              fontSize: '1.00em',
              fontWeight: '400',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            p: {
              fontFamily: '"Cute Font", sans-serif', // 단락 폰트 패밀리 설정
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
            a: {
              color: '#3182ce',                          // 링크 색상 설정
              '&:hover': {
                color: '#2c5282'                         // 호버 시 색상 설정
              }
            },
            blockquote: {
              fontSize: '0.50em',
              fontStyle: 'italic'
            },
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