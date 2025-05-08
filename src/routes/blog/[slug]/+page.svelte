<script>
    export let data;
</script>

<div class="prose">
    <h1>{data.meta.title}</h1>
    <p class="text-gray-500">{data.meta.date}</p>
    {#if data.content}
        <svelte:component this={data.content} />
    {:else}
        <p>Unable to load content.</p>
    {/if}
</div>