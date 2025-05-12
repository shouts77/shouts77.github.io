<script>
    export let data; // 서버에서 전달된 데이터를 props로 받음
</script>

<div class="prose flex justify-left w-full px-4 md:justify-left md:w-96 md:px-4 ">
    <table class="table-auto w-full">
        <tbody>
            {#each data.summaries as { slug, title, date }}
                <tr>
					<td class="text-gray-400 w-18">{date}</td>
					<td><a href="/blog/{slug}" class="no-underline">{title}</a></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>