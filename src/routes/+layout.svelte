<script>
    import '../styles/app.css';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    let { children } = $props();
    
    // 검색 모달 상태 관리
    let showSearchModal = $state(false);
    let searchQuery = $state('');
    let searchResults = $state([]);
    let isSearching = $state(false);
    let searchIndex = $state([]); // 기본 메타데이터 (색인)
    let loadedCategories = $state({}); // 로드된 카테고리 데이터
    let loadedYears = $state({}); // 로드된 연도 데이터
    let allPostsData = []; // 모든 포스트 데이터 (전체 검색 데이터)
    
    // 페이지 로드 시 검색 색인 데이터 가져오기
    onMount(async () => {
        try {
            console.log('검색 색인 데이터 로드 시도...');
            const response = await fetch('/search-data/index.json');
            if (response.ok) {
                searchIndex = await response.json();
                console.log(`검색 색인 로드 완료: ${searchIndex.length}개 포스트 메타데이터`);
            } else {
                // 색인 파일이 없으면 기존 방식으로 전체 데이터 로드
                console.log('색인 파일을 찾을 수 없어 전체 검색 데이터를 로드합니다.');
                const fullResponse = await fetch('/search-data.json');
                if (fullResponse.ok) {
                    const fullData = await fullResponse.json();
                    searchIndex = fullData.map(post => {
                        const { content, ...metadata } = post;
                        return metadata;
                    });
                    console.log(`전체 데이터에서 ${searchIndex.length}개 메타데이터 추출`);
                }
            }
        } catch (error) {
            console.error('검색 데이터 로드 중 오류 발생:', error);
        }
    });
    
    // 필요한 카테고리 데이터 로드
    async function loadCategoryData(category) {
        if (loadedCategories[category]) {
            return loadedCategories[category];
        }
        
        try {
            console.log(`카테고리 '${category}' 데이터 로드 중...`);
            const response = await fetch(`/search-data/category-${category}.json`);
            if (response.ok) {
                const data = await response.json();
                loadedCategories[category] = data;
                console.log(`카테고리 '${category}' 데이터 로드 완료: ${data.length}개 포스트`);
                return data;
            } else {
                console.error(`카테고리 '${category}' 데이터를 찾을 수 없습니다.`);
                return [];
            }
        } catch (error) {
            console.error(`카테고리 '${category}' 데이터 로드 중 오류 발생:`, error);
            return [];
        }
    }
    
    // 필요한 연도 데이터 로드
    async function loadYearData(year) {
        if (loadedYears[year]) {
            return loadedYears[year];
        }
        
        try {
            console.log(`연도 '${year}' 데이터 로드 중...`);
            const response = await fetch(`/search-data/year-${year}.json`);
            if (response.ok) {
                const data = await response.json();
                loadedYears[year] = data;
                console.log(`연도 '${year}' 데이터 로드 완료: ${data.length}개 포스트`);
                return data;
            } else {
                console.error(`연도 '${year}' 데이터를 찾을 수 없습니다.`);
                return [];
            }
        } catch (error) {
            console.error(`연도 '${year}' 데이터 로드 중 오류 발생:`, error);
            return [];
        }
    }
    
    // 전체 검색 데이터 로드 (필요한 경우)
    async function loadAllData() {
        try {
            console.log('전체 검색 데이터 로드 중...');
            const response = await fetch('/search-data.json');
            if (response.ok) {
                const data = await response.json();
                console.log(`전체 검색 데이터 로드 완료: ${data.length}개 포스트`);
                return data;
            } else {
                console.error('전체 검색 데이터를 찾을 수 없습니다.');
                return [];
            }
        } catch (error) {
            console.error('전체 검색 데이터 로드 중 오류 발생:', error);
            return [];
        }
    }
    
    // 검색 수행 함수
    function performSearch() {
        const query = searchQuery.trim().toLowerCase();
        
        if (!query) {
            searchResults = [];
            return;
        }
        
        isSearching = true;
        
        try {
            // 검색 데이터가 없으면 로드
            if (!allPostsData || allPostsData.length === 0) {
                fetch('/search-data.json')
                    .then(response => response.json())
                    .then(data => {
                        allPostsData = data;
                        executeSearch(query);
                    })
                    .catch(error => {
                        console.error('검색 데이터 로드 실패:', error);
                        searchResults = [];
                        isSearching = false;
                    });
            } else {
                executeSearch(query);
            }
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
            searchResults = [];
            isSearching = false;
        }
    }
    
    // 실제 검색 실행 함수 (별도로 분리)
    function executeSearch(query) {
        console.log(`검색어: "${query}"`);
        
        searchResults = allPostsData
            .filter(post => {
                const titleMatch = post.title && post.title.toLowerCase().includes(query);
                const contentMatch = post.content && post.content.toLowerCase().includes(query);
                const summaryMatch = post.summary && post.summary.toLowerCase().includes(query);
                const categoryMatch = post.category && post.category.toLowerCase().includes(query);
                
                // 디버깅용 로그
                if (post.content && post.content.toLowerCase().includes(query)) {
                    console.log(`포스트 '${post.title}'에서 '${query}' 키워드 발견`);
                }
                
                return titleMatch || contentMatch || summaryMatch || categoryMatch;
            })
            .map(post => {
                // 컨텍스트 추출 함수
                let matchContext = '';
                
                if (post.content && post.content.toLowerCase().includes(query)) {
                    matchContext = extractContextForKeyword(post.content, query, 60);
                    console.log(`컨텍스트 추출: "${matchContext}"`);
                } else if (post.summary && post.summary.toLowerCase().includes(query)) {
                    matchContext = extractContextForKeyword(post.summary, query, 60);
                }
                
                return {
                    slug: post.slug,
                    title: post.title,
                    date: post.date,
                    category: post.category || '미분류',
                    summary: post.summary || '',
                    matchContext: matchContext // 여기서 matchContext 필드를 추가
                };
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log(`검색 결과: ${searchResults.length}개 포스트 찾음`);
        isSearching = false;
    }
    
    // 컨텍스트 추출 함수
    function extractContextForKeyword(text, keyword, contextLength = 40) {
        if (!text || !keyword || typeof text !== 'string') return '';
        
        const lowerText = text.toLowerCase();
        const lowerKeyword = keyword.toLowerCase();
        const keywordIndex = lowerText.indexOf(lowerKeyword);
        
        if (keywordIndex === -1) return '';
        
        const startIndex = Math.max(0, keywordIndex - contextLength);
        const endIndex = Math.min(text.length, keywordIndex + keyword.length + contextLength);
        
        let context = text.substring(startIndex, endIndex);
        
        // 시작/끝에 있을 경우 생략 부호 추가
        if (startIndex > 0) context = '...' + context;
        if (endIndex < text.length) context = context + '...';
        
        // 키워드 강조 (선택적)
        // 클라이언트에서 처리하려면 HTML을 이스케이프 처리해야 함
        // context = context.replace(new RegExp(keyword, 'gi'), match => `<strong>${match}</strong>`);
        
        return context;
    }
    
    // 모달 열기/닫기
    function toggleSearchModal() {
        showSearchModal = !showSearchModal;
        if (!showSearchModal) {
            // 모달 닫을 때 상태 초기화
            searchQuery = '';
            searchResults = [];
        }
    }
    
    // 검색 입력 필드에 대한 이벤트 핸들러
    function handleInput() {
        // 검색어가 비어있는 경우, 강조 표시 제거를 위해 결과 재렌더링
        if (!searchQuery.trim()) {
            searchResults = [];
        }
    }

    // 엔터 키로 검색
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    }
    
    // 모달 외부 클릭 시 닫기
    function handleOutsideClick(event) {
        const modal = document.getElementById('search-modal');
        if (modal && !modal.contains(event.target) && showSearchModal) {
            toggleSearchModal();
        }
    }
</script>

<svelte:window on:click={handleOutsideClick} />

<nav class="w-full md:w-96 px-2 pt-1">
    <div class="flex justify-between items-center font-yoo text-sm">
        <!-- 왼쪽 탐색 링크 그룹 -->
        <div class="flex">
            <a 
                href="/" 
                class={`md px-2 py-1 text-sm hover:text-red-800 relative ${$page.url.pathname === '/' ? 'active' : ''}`}
            >
                첫화면
                {#if $page.url.pathname === '/'}
                    <span class="absolute left-2 bottom-0 h-[2px] w-8 translate-x-[-1px] bg-blue-400"></span>
                {/if}
            </a>
            <a 
                href="/blog" 
                class={`md px-2 py-1 text-sm hover:text-red-800 relative ${$page.url.pathname.startsWith('/blog') ? 'active' : ''}`}
            >
                기록
                {#if $page.url.pathname.startsWith('/blog')}
                    <span class="absolute left-0.5 bottom-0 h-[2px] w-8 translate-x-[-2px] bg-blue-400"></span>
                {/if}
            </a>
        </div>
        
        <!-- 오른쪽 소셜 버튼 그룹 -->
        <div class="flex items-center space-x-1">
            <!-- 검색 버튼 -->
            <button
                on:click|stopPropagation={toggleSearchModal}
                class="px-1 py-1 text-sm hover:text-blue-600"
                aria-label="검색"
                title="검색"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            
            <!-- X 바로가기 버튼 -->
            <a 
                href="https://x.com/shouts2713531" 
                class="px-1 py-1 text-sm hover:text-orange-600"
                aria-label="X로 이동"
                title="X로 이동"
                target="_blank" 
                rel="noopener"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            </a>
            
            <!-- RSS 버튼 -->
            <a 
                href="/rss.xml" 
                class="px-1 py-1 text-sm hover:text-orange-600"
                aria-label="RSS 피드 구독"
                title="RSS 피드 구독"
                target="_blank" 
                rel="noopener"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 inline" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/>
                </svg>
            </a>
        </div>
    </div>
</nav>

<!-- 검색 모달 -->
{#if showSearchModal}
    <div 
        class="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-start justify-center pt-14"
        on:click|self={toggleSearchModal}
    >
        <div 
            id="search-modal"
            class="bg-white rounded-md shadow-lg w-[80%] max-w-sm max-h-[75vh] overflow-hidden flex flex-col font-yoo animate-fadeIn"
            on:click|stopPropagation
        >
            <div class="p-2 border-b border-gray-100">
                <div class="flex justify-between items-center mb-1.5">
                    <h3 class="text-sm font-medium text-gray-800">검색</h3>
                    <button 
                        on:click={toggleSearchModal}
                        class="text-gray-400 hover:text-gray-600"
                        aria-label="닫기"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <!-- 검색 입력 필드 -->
                <div class="relative">
                    <input 
                        type="text"
                        placeholder="검색어를 입력하세요"
                        bind:value={searchQuery}
                        on:keypress={handleKeyPress}
                        on:input={handleInput}
                        class="w-full text-xs py-1 px-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                        autofocus
                    />
                    <button 
                        on:click={performSearch}
                        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="검색"
                        disabled={isSearching}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- 검색 결과 -->
            <div class="overflow-y-auto flex-1">
                {#if isSearching}
                    <div class="flex justify-center items-center py-4">
                        <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                {:else if searchResults.length > 0}
                    <ul class="divide-y divide-gray-100">
                        {#each searchResults as result}
                            <li>
                                <a 
                                    href="/blog/{result.slug}" 
                                    class="block py-1.5 px-2 hover:bg-gray-50 transition-colors"
                                    on:click={toggleSearchModal}
                                >
                                    <!-- 한 줄에 날짜, 카테고리, 제목 순서로 표시 -->
                                    <div class="flex items-center text-xs gap-1">
                                        <!-- 날짜 -->
                                        <span class="text-gray-400 shrink-0 tabular-nums">{result.date}</span>
                                        
                                        <!-- 카테고리 -->
                                        {#if result.category}
                                            <span class="px-1 py-0.5 rounded-full bg-gray-100 text-gray-700 shrink-0 text-xs">
                                                {result.category}
                                            </span>
                                        {/if}
                                        
                                        <!-- 제목에 키워드 강조 -->
                                        <h4 class="font-medium text-gray-800 truncate">
                                            {#if searchQuery && searchQuery.trim()}
                                                <!-- svelte-ignore security-warn -->
                                                {@html result.title.replace(
                                                    new RegExp(searchQuery, 'gi'), 
                                                    match => `<mark class="bg-yellow-200 px-0.5 rounded">${match}</mark>`
                                                )}
                                            {:else}
                                                {result.title}
                                            {/if}
                                        </h4>
                                    </div>
                                    
                                    <!-- 키워드 컨텍스트 표시 (있을 경우) -->
                                    {#if result.matchContext}
                                        <p class="mt-0.5 text-xs text-gray-600 bg-yellow-50 p-1 rounded leading-snug">
                                            {#if searchQuery && searchQuery.trim()}
                                                <!-- svelte-ignore security-warn -->
                                                {@html result.matchContext.replace(
                                                    new RegExp(searchQuery, 'gi'), 
                                                    match => `<mark class="bg-yellow-200 px-0.5 rounded">${match}</mark>`
                                                )}
                                            {:else}
                                                {result.matchContext}
                                            {/if}
                                        </p>
                                    {/if}
                                </a>
                            </li>
                        {/each}
                    </ul>
                    
                    {#if searchResults.length > 15}
                        <div class="p-1 text-center border-t border-gray-100">
                            <a 
                                href="/search?q={encodeURIComponent(searchQuery)}"
                                class="text-xs text-blue-600 hover:underline"
                                on:click={toggleSearchModal}
                            >
                                모든 결과 보기 ({searchResults.length}건)
                            </a>
                        </div>
                    {/if}
                {:else if searchQuery}
                    <div class="py-4 text-center">
                        <p class="text-gray-500 text-sm">검색 결과가 없습니다.</p>
                        <p class="text-xs text-gray-400 mt-1">다른 검색어로 시도해보세요.</p>
                    </div>
                {:else}
                    <div class="py-4 text-center text-gray-400 text-sm">
                        <p>검색어를 입력하세요</p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

{@render children()}

<style>
    /* 애니메이션 정의 */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fadeIn {
        animation: fadeIn 0.2s ease-out forwards;
    }
</style>
