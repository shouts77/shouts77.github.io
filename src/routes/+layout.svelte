<script>
    import '../styles/app.css';
    import { page } from '$app/stores';
    let { children } = $props();
</script>

<nav class="w-full md:w-96 px-2 pt-1">
    <div class="flex justify-between items-center font-yoo text-sm">
        <!-- 왼쪽 탐색 링크 그룹 -->
        <div class="flex">
            <a 
                href="/" 
                class={`md px-2 py-1 text-sm hover:text-red-800 relative ${$page.url.pathname === '/' ? 'active' : ''}`}
            >
                첫화면
                {#if $page.url.pathname === '/'}
                    <span class="absolute left-2 bottom-0 h-[2px] w-8 translate-x-[-1px] bg-blue-400"></span>
                {/if}
            </a>
            <a 
                href="/blog" 
                class={`md px-2 py-1 text-sm hover:text-red-800 relative ${$page.url.pathname.startsWith('/blog') ? 'active' : ''}`}
            >
                기록
                {#if $page.url.pathname.startsWith('/blog')}
                    <span class="absolute left-0.5 bottom-0 h-[2px] w-8 translate-x-[-2px] bg-blue-400"></span>
                {/if}
            </a>
        </div>
        
        <!-- 오른쪽 소셜 버튼 그룹 -->
        <div class="flex items-center space-x-1">
            <!-- X 바로가기 버튼 -->
            <a 
                href="https://x.com/shouts2713531" 
                class="px-2 py-1 text-sm hover:text-orange-600"
                title="X로 이동"
                target="_blank" 
                rel="noopener"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            </a>
            
            <!-- RSS 버튼 -->
            <a 
                href="/rss.xml" 
                class="px-2 py-1 text-sm hover:text-orange-600"
                title="RSS 피드 구독"
                target="_blank" 
                rel="noopener"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
                </svg>
                RSS
            </a>
        </div>
    </div>
</nav>

{@render children()}
