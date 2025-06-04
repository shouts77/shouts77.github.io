<script>
  import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-center p-4">
  <h1 class="text-4xl font-bold text-red-800 mb-4">Error {$page.status}</h1>
  <p class="text-gray-600 mb-8">{$page.error?.message || '페이지를 찾을 수 없습니다'}</p>
  <a href="/" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    홈으로 돌아가기
  </a>
</div>