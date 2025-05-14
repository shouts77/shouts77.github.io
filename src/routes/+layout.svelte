<script>
    import '../styles/app.css';
    import { page } from '$app/stores';
    let { children } = $props();
</script>

<nav class="w-full md:w-96 px-2 pt-1">
    <div class="flex justify-start font-yoo text-sm">
        <p>
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
        </p>
    </div>
<!--     <svg
        class="w-full h-1 md:h-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        fill="none"
    >
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#4a5565" stop-opacity="1" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="1" />
            </linearGradient>
        </defs>
        <rect width="100" height="0.3" fill="url(#gradient)" />
    </svg> -->
</nav>

{@render children()}
