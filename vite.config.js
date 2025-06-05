import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { generateSearchData } from './src/lib/generate-search-data.js';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		{
			name: 'generate-search-data',
			// 빌드 후 검색 데이터 생성
			closeBundle: async () => {
				console.log('빌드 완료, 검색 데이터 생성 중...');
				await generateSearchData();
			}
		}
	],
	optimizeDeps: {
		include: ['echarts']
	}
});
