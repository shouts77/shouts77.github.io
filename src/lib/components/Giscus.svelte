<script>
  import { onMount } from 'svelte';
  
  export let repo; // 'username/repo'
  export let repoId;
  export let category = 'General';
  export let categoryId;
  export let mapping = 'pathname'; // 'pathname', 'url', 'title', 'og:title', 'specific', 'number'
  export let term = ''; // mapping이 'specific'일 경우 사용
  export let reactionsEnabled = '1';
  export let emitMetadata = '0';
  export let inputPosition = 'top'; // 'top' 또는 'bottom'
  export let theme = 'light'; // 'light', 'dark', 'dark_high_contrast', 'dark_dimmed', 'transparent_dark', 'preferred_color_scheme'
  export let lang = 'ko'; // 'en', 'ko' 등
  
  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    if (mapping === 'specific') {
      script.setAttribute('data-term', term);
    }
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;
    
    const container = document.getElementById('giscus-container');
    container.appendChild(script);
    
    return () => {
      // 컴포넌트가 언마운트될 때 스크립트와 댓글 제거
      if (container.firstChild) {
        container.innerHTML = '';
      }
    };
  });
</script>

<div id="giscus-container" class="mt-8 pt-4 border-t border-gray-200"></div>