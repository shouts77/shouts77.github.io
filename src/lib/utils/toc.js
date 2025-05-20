/**
 * Markdown 콘텐츠의 HTML 요소에서 헤딩 요소를 추출하여 TOC 항목을 생성합니다.
 * @param {HTMLElement} content - Markdown 콘텐츠의 HTML 요소
 * @returns {Array} - 목차 항목의 배열
 */
export function generateTOC(content) {
  if (!content || !content.querySelectorAll) return [];

  // h1~h4 요소 선택 (h1은 이미 제목으로 사용하므로 h2부터 시작할 수도 있습니다)
  const headings = content.querySelectorAll('h2, h3, h4');
  const toc = [];

  headings.forEach((heading, index) => {
    // "목차"라는 텍스트를 가진 헤딩은 건너뜁니다.
    if (heading.textContent.trim() === "목차") {
      return;
    }
    
    // TOC 컴포넌트 내부에 있는 요소는 건너뜁니다.
    if (heading.closest('.toc-component') || heading.closest('[data-toc-component]')) {
      return;
    }

    // ID가 없으면 생성
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    const level = parseInt(heading.tagName.substring(1)) - 1; // h2 -> 1, h3 -> 2, ...
    
    toc.push({
      id: heading.id,
      text: heading.textContent,
      level: level
    });
  });

  return toc;
}