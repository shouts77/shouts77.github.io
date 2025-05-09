---
title: sveltekit apache echart test
date: 2025-05-08
---

# 프로그래밍 언어 사용 추이

최근 몇 년간 프로그래밍 언어의 인기도 변화를 살펴보겠습니다.

<script>
  import EChart from '$lib/components/EChart.svelte';
  
  const lineChartOptions = {
    title: {
      text: '프로그래밍 언어 인기도 (2020-2025)',
      textStyle: {
        fontFamily: 'Cute Font',
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['JavaScript', 'Python', 'Rust', 'Go', 'TypeScript'],
      textStyle: {
        fontFamily: 'Cute Font'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2020', '2021', '2022', '2023', '2024', '2025'],
      axisLabel: {
        fontFamily: 'Cute Font'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontFamily: 'Cute Font'
      }
    },
    series: [
      {
        name: 'JavaScript',
        type: 'line',
        data: [120, 132, 101, 134, 90, 98]
      },
      {
        name: 'Python',
        type: 'line',
        data: [220, 182, 191, 234, 290, 330]
      },
      {
        name: 'Rust',
        type: 'line',
        data: [50, 62, 82, 93, 140, 210]
      },
      {
        name: 'Go',
        type: 'line',
        data: [90, 103, 119, 135, 162, 188]
      },
      {
        name: 'TypeScript',
        type: 'line',
        data: [70, 95, 140, 198, 245, 280]
      }
    ]
  };
  
  const pieChartOptions = {
    title: {
      text: '2025년 개발자 선호도',
      left: 'center',
      textStyle: {
        fontFamily: 'Cute Font',
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        fontFamily: 'Cute Font'
      }
    },
    series: [
      {
        name: '선호도',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 335, name: 'JavaScript' },
          { value: 310, name: 'Python' },
          { value: 274, name: 'TypeScript' },
          { value: 235, name: 'Rust' },
          { value: 198, name: 'Go' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          fontFamily: 'Cute Font'
        }
      }
    ]
  };
</script>

## 연도별 인기도 변화

아래 차트는 2020년부터 2025년까지 주요 프로그래밍 언어의 인기도 변화를 보여줍니다.

<EChart options={lineChartOptions} height="400px" />

## 2025년 개발자 선호도

2025년 기준으로 개발자들이 가장 선호하는 프로그래밍 언어는 다음과 같습니다.

<EChart options={pieChartOptions} height="400px" />

위 데이터를 보면 Python과 TypeScript가 꾸준히 성장하고 있으며, 특히 Rust는 최근 5년간 가장 높은 성장률을 보였습니다.

## 결론

앞으로의 개발 환경에서는 다양한 언어를 유연하게 활용할 수 있는 능력이 더욱 중요해질 것으로 보입니다. 특히 데이터 분석과 타입 안정성이 중요해지면서 Python과 TypeScript의 성장이 계속될 것으로 예상됩니다.