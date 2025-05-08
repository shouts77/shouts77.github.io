<script>
	let { data, children } = $props();
</script>

<div>
	<main class="pb-2">
		{@render children()}
	</main>

	<aside class="flex-row justify-left w-full px-4 md:justify-left md:w-96 md:px-4">
		<div class="text-sm">
			<p class="text-sky-600">More posts</p>
			<ul class="text-gray-600">
				{#each data.summaries as { slug, title }}
					<li>
						<a href="/blog/{slug}">{title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</aside>
</div>
