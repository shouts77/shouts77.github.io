<script>
    import { formatDate } from '$lib/utils/formattingDate.js';
    export let data;
</script>

<div class="prose justify-left w-full px-4 md:justify-left md:w-96 md:px-4">
    <h1 class="mb-0">{data.meta.title}</h1>
    <p class="text-sm text-gray-500 mb-0">{formatDate(data.meta.date)}</p>
    {#if data.content}
        <svelte:component this={data.content} />
    {:else}
        <p>Unable to load content.</p>
    {/if}
</div>