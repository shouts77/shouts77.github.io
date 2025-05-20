<script>
    import { formatDate } from '$lib/utils/formattingDate.js';
    import { generateTOC } from '$lib/utils/toc.js';
    import TOC from '$lib/components/TOC.svelte';
    import { onMount, afterUpdate } from 'svelte';
    import { page } from '$app/stores';

    export let data;
    let tocItems = [];
    let contentElement;
    let otherPosts = [];
    
    // 페이지 전환을 감지하기 위해 $page.url.pathname을 구독
    $: currentPath = $page.url.pathname;
    
    // 데이터 또는 경로가 변경될 때마다 otherPosts 업데이트
    $: {
        if (data.summaries && data.meta) {
            updateOtherPosts();
        }
    }
    
    // 다른 포스트 목록을 업데이트하는 함수
    function updateOtherPosts() {
        // 날짜 기준으로 정렬 (최신순)
        const sortedPosts = [...data.summaries].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA; // 내림차순
        });
        
        // 현재 포스트 제목과 다른 포스트만 선택
        otherPosts = sortedPosts
            .filter(post => post.title !== data.meta.title)
            .slice(0, 3); // 최대 3개만 선택
    }
    
    // TOC 생성 함수
    function generateTableOfContents() {
        setTimeout(() => {
            contentElement = document.querySelector('.prose');
            if (contentElement) {
                tocItems = generateTOC(contentElement);
            }
        }, 100);
    }

    onMount(() => {
        generateTableOfContents();
    });
    
    // 페이지 전환 및 데이터 변경 후 업데이트
    afterUpdate(() => {
        generateTableOfContents();
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
