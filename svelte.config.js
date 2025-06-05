// import adapter from '@sveltejs/adapter-auto';

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { generateSearchData } from './src/lib/generate-search-data.js';

// 빌드 시 검색 데이터 생성
generateSearchData();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
    	adapter: adapter({
			// 정적 파일이 생성될 디렉토리
      	pages: 'build',
      	assets: 'build',
      	fallback: '404.html',
      	precompress: false
    	}),
        // 사용자 사이트는 base 경로가 필요 없음
        paths: {
          base: '' // 사용자이름.github.io는 base 경로가 없음
        }
	},
	preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: ['.md']
        })
	]
};

export default config;
