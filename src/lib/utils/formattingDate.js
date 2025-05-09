/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷팅합니다.
 * @param {string|Date} dateString - 포맷팅할 날짜 문자열 또는 Date 객체
 * @returns {string} - YYYY-MM-DD 형식의 날짜 문자열
 */
export function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}