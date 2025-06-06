<script>
    import { getCategoryColorClass } from '$lib/utils/categoryStyles.js';
    export let data;
    
    // 선택된 카테고리 (기본값: 전체)
    let selectedCategory = '전체';
    
    // 페이지네이션 관련 변수
    let currentPage = 1;
    let itemsPerPage = 10; // 페이지당 표시할 항목 수
    
    // 날짜 기준으로 정렬 (최신순)
    $: sortedSummaries = [...data.summaries].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // 내림차순 (최신 날짜가 먼저)
    });
    
    // 카테고리 기준으로 필터링
    $: filteredSummaries = selectedCategory === '전체' 
        ? sortedSummaries 
        : sortedSummaries.filter(post => post.category === selectedCategory);
    
    // 총 페이지 수 계산
    $: totalPages = Math.ceil(filteredSummaries.length / itemsPerPage);
    
    // 현재 페이지에 표시할 항목들
    $: paginatedItems = filteredSummaries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    // 페이지 변경 함수
    function goToPage(page) {
        currentPage = page;
        // 맨 위로 스크롤 (선택 사항)
        // window.scrollTo(0, 0);
    }
    
    // 이전/다음 페이지 이동 함수
    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage -= 1;
        }
    }
    
    function goToNextPage() {
        if (currentPage < totalPages) {
            currentPage += 1;
        }
    }
    
    // 카테고리 변경시 페이지 초기화
    $: selectedCategory, resetPagination();
    
    function resetPagination() {
        currentPage = 1;
    }
    
    // 페이지 버튼 렌더링 (최대 5개)
    $: pageButtons = getPageButtons(currentPage, totalPages);
    
    function getPageButtons(current, total) {
        const buttons = [];
        const maxButtons = 5;
        
        if (total <= maxButtons) {
            // 전체 페이지 수가 5개 이하인 경우 모든 페이지 표시
            for (let i = 1; i <= total; i++) {
                buttons.push(i);
            }
        } else {
            // 전체 페이지가 5개 초과인 경우 현재 페이지 주변 표시
            let start = Math.max(current - 2, 1);
            let end = Math.min(start + maxButtons - 1, total);
            
            // 뒤쪽에 공간이 부족하면 시작점 조정
            if (end === total) {
                start = Math.max(end - maxButtons + 1, 1);
            }
            
            for (let i = start; i <= end; i++) {
                buttons.push(i);
            }
        }
        
        return buttons;
    }
</script>

<style>
    /* 드롭다운 스타일 추가 */
    select {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-position: right 0.5rem center;
        background-repeat: no-repeat;
        background-size: 0.8em 0.8em;
        border: 1px solid #e2e8f0; /* 연한 회색 테두리 */
        border-radius: 0.375rem; /* 둥근 모서리 */
        outline: none;
        background-color: white;
        padding: 0.15rem 0.5rem; /* 상하 패딩 줄이기 */
        padding-right: 1.8rem; /* 화살표를 위한 공간 */
        font-size: 0.875rem; /* 글자 크기 작게 */
        height: 1.40rem; /* 고정 높이 설정 */
        line-height: 1.2; /* 줄 간격 줄이기 */
    }
    
    select:focus {
        outline: none;
        border-color: #a0aec0; /* 포커스 시 테두리 색상 약간 진하게 */
        box-shadow: 0 0 0 1px rgba(160, 174, 192, 0.2); /* 미세한 그림자 효과 */
    }
    
    /* 옵션 높이 조정 */
    option {
        padding: 0.1rem 0;
    }
    
    /* 페이지네이션 스타일 수정 */
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.2rem; /* 여백도 약간 줄임 */
    }
    
    .pagination-btn {
        padding: 0.1rem 0.4rem; /* 위아래 패딩을 0.25rem에서 0.1rem으로 줄임 */
        margin: 0 0.25rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.375rem;
        background-color: white;
        font-size: 0.75rem; /* 글자 크기도 약간 줄임 */
        cursor: pointer;
        line-height: 1.2; /* 줄 간격 줄이기 */
        height: 1.4rem; /* 고정 높이 설정 */
        min-width: 1.5rem; /* 최소 너비 설정하여 일관된 모양 유지 */
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .pagination-btn:hover {
        background-color: #f7fafc;
    }
    
    .pagination-btn.active {
        background-color: #3182ce;
        color: white;
        border-color: #3182ce;
    }
    
    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>


<div class="flex flex-col w-full px-4 pt-2.5 md:w-96 md:px-4 font-yoo text-sm">
    <!-- 카테고리 선택 옵션 -->
    <div class="mb-3">
        <label for="category-filter" class="mr-2 text-blue-800">카테고리</label>
        <select 
            id="category-filter" 
            bind:value={selectedCategory}
            class="text-sm"
        >
            <option>전체</option>
            {#each data.categories as category}
                <option>{category}</option>
            {/each}
        </select>
    </div>
    
    <!-- 포스트 목록 테이블 -->
    <table class="table-auto w-full text-sm">
        <tbody>
            {#each paginatedItems as { slug, title, date, category }}
                <tr>
                    <td class="text-gray-400 align-top w-14">{date}</td>
                    <td>
                        <span class="text-xs px-1.5 py-0.5 rounded-full {getCategoryColorClass(category)}">{category}</span>
                        <a href="/blog/{slug}" class="no-underline hover:text-blue-800">{title}</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    
    <!-- 결과가 없을 경우 메시지 표시 -->
    {#if filteredSummaries.length === 0}
        <p class="text-gray-500 mt-4">이 카테고리에 해당하는 글이 없습니다.</p>
    {/if}
    
    <!-- 페이지네이션 -->
    {#if totalPages > 1}
        <div class="pagination">
            <button 
                class="pagination-btn" 
                disabled={currentPage === 1} 
                on:click={goToPrevPage}
            >
                &lt;
            </button>
            
            {#each pageButtons as page}
                <button 
                    class="pagination-btn {page === currentPage ? 'active' : ''}" 
                    on:click={() => goToPage(page)}
                >
                    {page}
                </button>
            {/each}
            
            <button 
                class="pagination-btn" 
                disabled={currentPage === totalPages} 
                on:click={goToNextPage}
            >
                &gt;
            </button>
        </div>
    {/if}
</div>