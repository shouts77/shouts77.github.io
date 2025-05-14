<script>
    export let data; // 서버에서 전달된 데이터를 props로 받음

        // 날짜 기준으로 정렬 (최신순)
    $: sortedSummaries = [...data.summaries].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // 내림차순 (최신 날짜가 먼저)
    });
</script>

<div class="flex justify-left w-full px-4 pt-2.5 md:justify-left md:w-96 md:px-4 font-yoo text-sm md:items-start">
    <table class="table-auto w-full text-sm">
        <tbody>
            {#each sortedSummaries as { slug, title, date }}
                <tr>
					<td class="text-gray-400 align-top w-16">{date}</td>
					<td><a href="/blog/{slug}" class="no-underline hover:text-blue-800">{title}</a></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>