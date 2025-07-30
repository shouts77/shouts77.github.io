/**
 * 카테고리별 스타일 정의
 */
export const categoryColors = {
    'about': 'bg-blue-100 text-blue-800',
    'memo': 'bg-green-100 text-green-800',
    'photo': 'bg-yellow-100 text-yellow-800',
    'note': 'bg-gray-100 text-gray-800'
    // 필요에 따라 추가
};

/**
 * 카테고리에 맞는 색상 클래스를 반환하는 함수
 * @param {string} category - 카테고리 이름
 * @returns {string} - 해당 카테고리의 CSS 클래스
 */
export function getCategoryColorClass(category) {
    return categoryColors[category] || 'bg-gray-100 text-gray-800';
}