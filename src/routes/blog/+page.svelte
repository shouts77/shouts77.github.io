<script>
    export let data; // 서버에서 전달된 데이터를 props로 받음
</script>

<div class="flex justify-left w-full px-4 md:justify-left md:w-96 md:px-4">
    <table class="table-auto">
        <tbody>
            {#each data.summaries as { slug, title, date }}
                <tr>
					<td class="text-sm text-gray-400">{date}</td>
					<td class="px-1 text-sm hover:underline"><a href="/blog/{slug}">{title}</a></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>