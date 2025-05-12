<script>
import { formatDate } from '$lib/utils/formattingDate.js';
import { generateTOC } from '$lib/utils/toc.js';
import TOC from '$lib/components/TOC.svelte';
import { onMount } from 'svelte';

export let data;
let tocItems = [];
let contentElement;
  
onMount(() => {
    // 콘텐츠가 마운트된 후 TOC 생성
    setTimeout(() => {
      contentElement = document.querySelector('.prose');
      if (contentElement) {
        tocItems = generateTOC(contentElement);
      }
    }, 100); // 약간의 지연을 두어 콘텐츠가 완전히 렌더링되도록 함
});
</script>

<div class="prose justify-left w-full px-4 md:justify-left md:w-96 md:px-4">
    <h1 class="mb-0">{data.meta.title}</h1>
    <p class="text-sm text-gray-500 mb-0">{formatDate(data.meta.date)}</p>

    <!-- 작은 화면에서만 표시되는 TOC -->
    <div class="xl:hidden">
      <TOC toc={tocItems} title="목차" isFloating={false} />
    </div>

    {#if data.content}
        <svelte:component this={data.content} />
    {:else}
        <p>Unable to load content.</p>
    {/if}

</div>

<!-- 큰 화면에서만 표시되는 사이드바 TOC -->

<div class="hidden xl:block fixed right-[calc((100%-850px)/2-300px)] w-40 p-4">
<TOC toc={tocItems} title="목차" isFloating={true} />
</div>
