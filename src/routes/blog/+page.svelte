<script>
	let { data } = $props();
</script>

<div class="flex justify-left w-full px-4 md:justify-left md:w-96 md:px-4">
	<table class="table-auto">
<!-- 		<thead>
			<tr>
				<th class="px-4">Title</th>
				<th class="px-4">Date</th>
			</tr>
		</thead> -->
		<tbody>
			{#each data.summaries as { slug, title, date }}
				<tr>
					<td class="text-sm text-gray-400">{date}</td>
					<td class="px-1 text-sm"><a href="/blog/{slug}">{title}</a></td>
				</tr>
			{/each}
		</tbody>
<!-- 	<ul>
		{#each data.summaries as { slug, title, date }}
			<li><a href="/blog/{slug}">{date} {title}</a></li>
		{/each}
	</ul> -->
</div>
