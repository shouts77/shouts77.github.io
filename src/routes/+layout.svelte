<script>
	import '../styles/app.css';
	let { children } = $props();
</script>

<nav class="w-96">
	<div class="flex justify-center space-x-4">
		<a href="/" class="md px-4 py-1 text-sm font-medium text-black-300 hover:bg-gray-100 hover:text-gray-600">Home</a>
		<a href="/about" class="md px-4 py-1 text-sm font-medium text-black-300 hover:bg-gray-100 hover:text-gray-600">About</a>
	</div>
	<hr class="w-96 h-0.5 bg-gray-200 border-0">
</nav>

{@render children()}
