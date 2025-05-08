<script>
	import '../styles/app.css';
	let { children } = $props();
</script>

<nav class="w-full md:w-96 px-2">
    <div class="flex justify-start md:justify-start">
        <a 
            href="/" 
            class="md px-2 py-1 text-sm font-medium text-black-300 hover:bg-gradient-to-b hover:from-white hover:to-gray-200 hover:text-gray-600"
        >
            Home
        </a>
        <a 
            href="/blog" 
            class="md px-2 py-1 text-sm font-medium text-black-300 hover:bg-gradient-to-b hover:from-white hover:to-gray-200 hover:text-gray-600"
        >
            log
        </a>
    </div>
    <svg
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
    </svg>
</nav>

{@render children()}
