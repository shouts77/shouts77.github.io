<script>
    export let data;
    
    // 선택된 카테고리 (기본값: 전체)
    let selectedCategory = '전체';
    
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
    
    // 카테고리별 색상 매핑 (선택 사항)
    const categoryColors = {
        'about': 'bg-blue-100 text-blue-800',
        'memo': 'bg-green-100 text-green-800',
        'photo': 'bg-yellow-100 text-yellow-800',
        '미분류': 'bg-gray-100 text-gray-800'
        // 필요에 따라 추가
    };
    
    // 카테고리에 맞는 색상 클래스 반환
    function getCategoryColorClass(category) {
        return categoryColors[category] || 'bg-gray-100 text-gray-800';
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
            {#each filteredSummaries as { slug, title, date, category }}
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
</div>