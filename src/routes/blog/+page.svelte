<script>
    export let data; // 서버에서 전달된 데이터를 props로 받음
</script>

<div class="flex justify-left w-full px-4 md:justify-left md:w-96 md:px-4 font-bujang text-sm md:items-start">
    <table class="table-auto w-full text-sm">
        <tbody>
            {#each data.summaries as { slug, title, date }}
                <tr>
					<td class="text-gray-400 align-top w-18">{date}</td>
					<td><a href="/blog/{slug}" class="no-underline hover:text-blue-800">{title}</a></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>