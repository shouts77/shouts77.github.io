<script>
import { onMount } from 'svelte';
import * as echarts from 'echarts';

export let options = {};
export let width = '100%';
export let height = '400px';
export let fontFamily = 'Noto Sans KR'; 

let chartElement;
let chart;
  
// 글꼴 스타일 설정
const applyFontFamily = (opt) => {
  // 복사본 생성
  const newOptions = JSON.parse(JSON.stringify(opt));
  
  // 기본 글꼴 설정
  if (!newOptions.textStyle) {
    newOptions.textStyle = { fontFamily: fontFamily };
  } else {
    newOptions.textStyle.fontFamily = fontFamily;
  }
  
  // 제목 글꼴 설정
  if (newOptions.title && !newOptions.title.textStyle) {
    newOptions.title.textStyle = { fontFamily: fontFamily };
  } else if (newOptions.title) {
    newOptions.title.textStyle.fontFamily = fontFamily;
  }
  
  // x축 글꼴 설정
  if (newOptions.xAxis) {
    const axes = Array.isArray(newOptions.xAxis) ? newOptions.xAxis : [newOptions.xAxis];
    axes.forEach(axis => {
      if (!axis.axisLabel) axis.axisLabel = {};
      axis.axisLabel.fontFamily = fontFamily;
    });
  }
  
  // y축 글꼴 설정
  if (newOptions.yAxis) {
    const axes = Array.isArray(newOptions.yAxis) ? newOptions.yAxis : [newOptions.yAxis];
    axes.forEach(axis => {
      if (!axis.axisLabel) axis.axisLabel = {};
      axis.axisLabel.fontFamily = fontFamily;
    });
  }
  
  // 범례 글꼴 설정
  if (newOptions.legend) {
    if (!newOptions.legend.textStyle) newOptions.legend.textStyle = {};
    newOptions.legend.textStyle.fontFamily = fontFamily;
  }
  
  return newOptions;
};

onMount(() => {
  // 차트 초기화
  chart = echarts.init(chartElement);
  chart.setOption(applyFontFamily(options));
  
  // 창 크기 변경 시 차트 크기도 조정
  const resizeHandler = () => {
    chart.resize();
  };
  window.addEventListener('resize', resizeHandler);
  
  return () => {
    // 컴포넌트 해제 시 이벤트 리스너와 차트 제거
    window.removeEventListener('resize', resizeHandler);
    chart.dispose();
  };
});

// options가 변경될 때 차트 업데이트
$: if (chart && options) {
  chart.setOption(applyFontFamily(options));
}
</script>

<div class="echarts-container" bind:this={chartElement} style="width: {width}; height: {height};"></div>

<style>
.echarts-container {
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>