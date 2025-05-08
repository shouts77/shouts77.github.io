<script>
	let { data } = $props();
</script>

<div class="flex-row justify-left w-full px-4 md:justify-left md:w-96 md:px-4">
	<h1>{data.post.title}</h1>
	<div class="text-sm text-gray-400">{data.post.date}</div>
	<div class="text-sm">{@html data.post.content}</div>
</div>