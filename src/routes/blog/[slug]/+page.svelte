<script>
    import { formatDate } from '$lib/utils/formattingDate.js';
    import { generateTOC } from '$lib/utils/toc.js';
    import { getCategoryColorClass } from '$lib/utils/categoryStyles.js';
    import TOC from '$lib/components/TOC.svelte';
    import Giscus from '$lib/components/Giscus.svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    
    // export let data 대신 $props() 사용
    const { data } = $props();
    
    // 반응형 상태 변수들
    let tocItems = $state([]);
    let contentElement = $state(null);
    let otherPosts = $state([]);
    
    // 현재 슬러그를 추적
    const currentSlug = $derived($page.params.slug || '');
    
    // Giscus 테마 상태
    let giscusTheme = $state('light'); // 기본 테마는 light
    
    // 데이터 변경 감지 및 업데이트
    $effect(() => {
        if (data.summaries && data.meta) {
            updateOtherPosts();
        }
    });
    
    // 슬러그 변경 감지
    $effect(() => {
        if (currentSlug) {
            // 페이지 변경 시 TOC 초기화 후 재생성
            tocItems = [];
            setTimeout(() => {
                generateTableOfContents();
            }, 10);
        }
    });
    
    // 다른 포스트 목록을 업데이트하는 함수
    function updateOtherPosts() {
        // 날짜 기준으로 정렬 (최신순)
        const sortedPosts = [...data.summaries].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA; // 내림차순
        });
        
        // 현재 포스트와 다른 포스트만 선택 - 슬러그로 비교
        otherPosts = sortedPosts
            .filter(post => post.slug !== currentSlug)
            .slice(0, 3); // 최대 3개만 선택
    }
    
    // TOC 생성 함수
    function generateTableOfContents() {
        // TOC 초기화
        tocItems = [];
        
        // 콘텐츠 요소 찾기
        contentElement = document.querySelector('.prose');
        if (!contentElement) {
        //  console.log('Content element not found');
            return;
        }
        
        // 목차 생성
        const newTocItems = generateTOC(contentElement);
        tocItems = newTocItems;
    //  console.log('Generated TOC items:', tocItems);
    }

    // 페이지 탐색 후 처리
    afterNavigate(() => {
    //  console.log('Navigation completed, regenerating TOC');
        // 이전 TOC 지우기
        tocItems = [];
        
        // DOM이 완전히 업데이트된 후 TOC 생성
        setTimeout(() => {
            generateTableOfContents();
            updateOtherPosts();
        }, 150);
    });
    
    // 페이지 탐색 전 처리
    beforeNavigate(() => {
    //  console.log('Navigation starting, clearing TOC');
        // 새 페이지로 이동하기 전에 TOC 초기화
        tocItems = [];
    });

    onMount(() => {
    // console.log('Component mounted, generating TOC');
        setTimeout(() => {
            generateTableOfContents();
        }, 100);
    });
</script>

<div class="justify-left w-full px-4 pt-2.5 md:justify-left md:w-96 md:px-4">
    <div class="prose">
        <h1 class="mb-0 text-blue-800">{data.meta.title}</h1>
        <p class="text-sm text-gray-500 mb-2">
            {formatDate(data.meta.date)}
            <!-- 카테고리 배지 추가 -->
            {#if data.meta.category}
            <span class="text-xs px-1.5 py-0 rounded {getCategoryColorClass(data.meta.category)}">
                {data.meta.category}
            </span>
            {/if}
        </p>

        <!-- 작은 화면에서만 표시되는 TOC -->
        <div class="xl:hidden font-yoo mt-4">
            <TOC toc={tocItems} title="목차" isFloating={false} />
        </div>

        {#if data.content}
            <data.content />
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
                    <td class="text-gray-400 align-top w-14">
                        {formatDate(post.date)}
                    </td>
                    <td>
                       <!-- 카테고리 배지 추가 -->
                        {#if post.category}
                        <span class="text-xs px-1.5 py-0 rounded {getCategoryColorClass(post.category)}">
                            {post.category}
                        </span>
                        <a href="/blog/{post.slug}" class="no-underline hover:text-blue-800">
                            {post.title}
                        </a>
                        {/if}
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </aside>
    <br />
    {/if}

    <!-- Giscus 댓글 시스템 추가 -->
    <Giscus
        repo="shouts77/shouts77.github.io"
        repoId="R_kgDOO2PVag"
        category="General"
        categoryId="DIC_kwDOO2PVas4C0dIL"
        mapping="pathname"
        reactionsEnabled="1"
        theme={giscusTheme}
        lang="ko"
    />
</div>

<!-- 큰 화면에서만 표시되는 사이드바 TOC -->
<div class="hidden xl:block fixed right-[calc((100%-850px)/2-280px)] w-40 p-4 font-yoo">
    {#if tocItems.length > 0}
        <TOC toc={tocItems} title="목차" isFloating={true} />
    {:else if contentElement && !tocItems.length}
        <!-- 콘텐츠가 로드되었지만 목차 항목이 없는 경우 -->
        <div class="text-sm text-gray-400 font-yoo">
        </div>
    {:else}
        <!-- 콘텐츠 로딩 중이거나 TOC 생성 중인 경우 -->
        <div class="text-sm text-gray-400 font-yoo">목차를 생성 중...</div>
    {/if}
</div>
