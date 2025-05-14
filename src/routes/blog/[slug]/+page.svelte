<script>
    import { formatDate } from '$lib/utils/formattingDate.js';
    import { generateTOC } from '$lib/utils/toc.js';
    import TOC from '$lib/components/TOC.svelte';
    import { onMount } from 'svelte';

    export let data;
    let tocItems = [];
    let contentElement;
    let otherPosts = [];
  
onMount(() => {
    // 콘텐츠가 마운트된 후 TOC 생성
    setTimeout(() => {
      contentElement = document.querySelector('.prose');
      if (contentElement) {
        tocItems = generateTOC(contentElement);
      }
      
      // 가장 최근 날짜 포스트 3개 가져오기
      if (data.summaries && data.meta) {
        // 날짜 기준으로 정렬 (최신순)
        const sortedPosts = [...data.summaries].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA; // 내림차순 (최신 날짜가 먼저)
        });
        
        // 현재 포스트 제목과 다른 포스트만 선택
        otherPosts = sortedPosts
          .filter(post => post.title !== data.meta.title) // 제목으로 필터링
          .slice(0, 3); // 최대 3개만 선택
      }
    }, 100); // 약간의 지연을 두어 콘텐츠가 완전히 렌더링되도록 함
});
</script>

<div class="justify-left w-full px-4 pt-2.5 md:justify-left md:w-96 md:px-4">
    <div class="prose">
        <h1 class="mb-0 text-blue-800">{data.meta.title}</h1>
        <p class="text-sm text-gray-500 mb-0">{formatDate(data.meta.date)}</p>

        <!-- 작은 화면에서만 표시되는 TOC -->
        <div class="xl:hidden font-yoo">
            <TOC toc={tocItems} title="목차" isFloating={false} />
        </div>

        {#if data.content}
            <svelte:component this={data.content} />
        {:else}
            <p>Unable to load content.</p>
        {/if}
    </div>

    <!-- 다른 포스트 섹션 -->
    {#if otherPosts.length > 0}
    <aside class="mt-8 border-t border-gray-200 pt-3 font-yoo">
        <h2 class="text-red-800">다른 기록들...</h2>
        <table class="table-auto w-full text-sm">
            <tbody>
                {#each otherPosts as post}
                <tr>
                    <td class="text-gray-400 align-top w-16">
                    {formatDate(post.date)}
                    </td>
                    <td>
                        <a href="/blog/{post.slug}" class="no-underline hover:text-blue-800">
                            {post.title}
                        </a>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </aside>
    <br />
    {/if}

</div>

<!-- 큰 화면에서만 표시되는 사이드바 TOC -->

<div class="hidden xl:block fixed right-[calc((100%-850px)/2-280px)] w-40 p-4 font-yoo">
    <TOC toc={tocItems} title="목차" isFloating={true} />
</div>
