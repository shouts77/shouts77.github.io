import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    try {
        console.log('Slug:', params.slug); // 디버깅용 출력
        
        // fs와 path를 사용하여 파일 읽기
        const filePath = path.resolve(`src/posts/${params.slug}.md`);
        console.log('File path:', filePath); // 디버깅용 출력
        
        if (!fs.existsSync(filePath)) {
            console.log('File not found:', filePath); // 디버깅용 출력
            throw error(404, `Post not found: ${params.slug}`);
        }
        
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const { content, data } = matter(fileContents);
        
        return {
            content,
            meta: data
        };
    } catch (e) {
        console.error('Error:', e); // 디버깅용 출력
        throw error(404, `Could not find post: ${params.slug}`);
    }
};