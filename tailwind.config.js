/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontFamily: '"Kimyooyee"',
              fontSize: '1.50em',
              fontWeight: '400',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            h2: {
              fontFamily: '"Kimyooyee"',
              fontSize: '1.25em',
              fontWeight: '400',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            h3: {
              fontFamily: '"Kimyooyee"',
              fontSize: '1.00em',
              fontWeight: '400',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            h4: {
              fontFamily: '"Kimyooyee"',
              fontSize: '0.80em',
              fontWeight: '400',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            p: {
              fontFamily: '"Kimyooyee"',
              fontSize: '0.80em',                        // 단락 폰트 크기 설정
              lineHeight: '1.5',                         // 줄 간격 설정
              marginTop: '0.05em',
              marginBottom: '0.8em'
            },
            li: {
              fontFamily: '"Kimyooyee"',
              fontSize: '0.80em',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            'img.post-vertical': {
              maxHeight: '400px',        // 세로형 이미지 최대 높이
              width: 'auto',             // 너비는 자동으로 비율 유지
              margin: '0.5em auto',      // 상하 여백과 가운데 정렬
              display: 'block',          // 블록 요소로 설정
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // 그림자 효과
              borderRadius: '0.375rem',  // 모서리 둥글게
            },
            'img.post-horizontal': {
              maxWidth: '90%',           // 가로형 이미지 최대 너비 (컨테이너에 맞춤)
              height: 'auto',            // 높이는 자동으로 비율 유지
              margin: '0.5em auto',      // 상하 여백과 가운데 정렬
              display: 'block',          // 블록 요소로 설정
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // 그림자 효과
              borderRadius: '0.375rem',  // 모서리 둥글게
            },
              'img.post-square': {
              maxHeight: '400px',        // 정사각형 이미지 최대 높이
              width: 'auto',             // 너비는 자동으로 비율 유지
              margin: '0.5em auto',      // 상하 여백과 가운데 정렬
              display: 'block',          // 블록 요소로 설정
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // 그림자 효과
              borderRadius: '0.375rem',  // 모서리 둥글게
            },
          },
        },
      },
      fontFamily: {
/*         'cute': ['"Cute Font"', 'cursive'], */
        'noto': ['"Noto Sans KR"', 'sans-serif'],
        'bujang': ['"Bujangnim_nunchi"', 'sans-serif'],
        'yoo': ['"Kimyooyee"', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}