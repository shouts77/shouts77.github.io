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
              marginBottom: '0.8em',
              textAlign: 'left',                         // 기본 왼쪽 정렬
            },
            li: {
              fontFamily: '"Kimyooyee"',
              fontSize: '0.80em',
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },
            'img.post-vertical': {
              maxHeight: '400px',        // 모바일에서는 좀 더 작은 높이
              maxWidth: '100%',          // 모바일에서 너비 제한
              width: 'auto',             // 너비는 자동으로 비율 유지
              margin: '1.5em auto',      // 더 넓은 상하 여백과 가운데 정렬
              display: 'block',          // 블록 요소로 설정
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // 그림자 효과
              borderRadius: '0.375rem',  // 모서리 둥글게
              // 500px 이하 화면에서는 너비를 화면에 완전히 맞춤
              '@media (max-width: 500px)': {
                maxHeight: 'none',       // 높이 제한 해제하여 비율 유지
                width: '100%',           // 너비를 화면에 맞춤
                maxWidth: '100%',
                margin: '1em auto',      // 모바일에서는 여백 줄임
              },
              // 768px 이상 화면에서는 더 큰 높이 허용
              '@media (min-width: 768px)': {
                maxHeight: '460px',
                maxWidth: 'none',        // 데스크톱에서는 너비 제한 없음
              },
            },
            'img.post-horizontal': {
              maxWidth: '100%',          // 모바일에서는 전체 너비 사용
              height: 'auto',            // 높이는 자동으로 비율 유지
              margin: '1.5em auto',      // 더 넓은 상하 여백과 가운데 정렬
              display: 'block',          // 블록 요소로 설정
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // 그림자 효과
              borderRadius: '0.375rem',  // 모서리 둥글게
              // 500px 이하 화면에서는 화면에 안전하게 맞춤
              '@media (max-width: 500px)': {
                width: '100%',           // 너비를 화면에 맞춤
                maxWidth: '100%',        // 최대 너비도 100%로 보장
                margin: '1em auto',      // 모바일에서는 여백 줄임
              },
              // 768px 이상 화면(태블릿/데스크톱)에서는 80%로 제한
              '@media (min-width: 768px)': {
                maxWidth: '80%',
              },
            },
              'img.post-square': {
              maxHeight: '350px',        // 모바일에서는 좀 더 작은 높이
              maxWidth: '100%',          // 모바일에서 너비 제한
              width: 'auto',             // 너비는 자동으로 비율 유지
              margin: '1.5em auto',      // 더 넓은 상하 여백과 가운데 정렬
              display: 'block',          // 블록 요소로 설정
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // 그림자 효과
              borderRadius: '0.375rem',  // 모서리 둥글게
              // 500px 이하 화면에서는 너비를 화면에 완전히 맞춤
              '@media (max-width: 500px)': {
                maxHeight: 'none',       // 높이 제한 해제하여 비율 유지
                width: '100%',           // 너비를 화면에 맞춤
                maxWidth: '100%',
                margin: '1em auto',      // 모바일에서는 여백 줄임
              },
              // 768px 이상 화면에서는 더 큰 높이 허용
              '@media (min-width: 768px)': {
                maxHeight: '400px',
                maxWidth: 'none',        // 데스크톱에서는 너비 제한 없음
              },
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