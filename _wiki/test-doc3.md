---
layout  : wiki
title   : test-doc3
date    : 2022-12-06 21:24:00 +0900
updated : 2022-12-06 21:30:52 +0900
tag     : 
toc     : true
public  : true
parent  : index 
latex   : false
---

* TOC
{:toc}

## 개요

자신의 웹 페이지에서 LaTeX를 사용하고 싶다면 MathJax에서 제공하는 자바스크립트 라이브러리를 쓰면 된다.

## 설치 방법

[MathJax.org](https://www.mathjax.org/)의 [Getting Started](https://www.mathjax.org/#gettingstarted) 페이지에서 제공하는 설명대로 다음의 코드를 자신의 웹 페이지에 추가하면 된다.

```html
<script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML'></script>
```

그러면 해당 웹 페이지에 있는 텍스트 중, `$``$`로 좌우가 감싸인 문자열은 LaTeX 문법으로 인식해, 수식으로 변환해준다.

