<script>
  export let toc = [];
  export let title = "목차";
  export let isFloating = false; // 우측에 떠있는 형태인지 여부
</script>

{#if toc.length > 0}
  <div class={isFloating 
    ? "fixed top-8 w-40 max-h-[70vh] overflow-y-auto hidden lg:block" 
    : "-my-4 pb-4 w-full"
  }>
    <h3 class="text-sm font-semibold mb-1 text-gray-600">{title}</h3>

    {#if isFloating}
      <!-- 사이드바 TOC (floating) 스타일 -->
      <ul class="space-y-1 text-xs text-gray-400">
        {#each toc as item}
          <li class="hover:text-blue-600">
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        {/each}
      </ul>
    {:else}
      <!-- 인라인 TOC 스타일 -->
      <ul class="space-y-1 text-xs text-gray-400">
        {#each toc as item}
          <li class="hover:text-blue-600">
            <a href={`#${item.id}`} class="no-underline">{item.text}</a>
          </li>
        {/each}
      </ul>
    {/if}

  </div>
{/if}