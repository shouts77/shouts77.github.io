---
layout  : wiki
title   : Vimwiki-Project
summary : fork한 Vimwiki를 커스터마이징해보자. 
date    : 2022-12-12 08:23:58 +0900
updated : 2022-12-16 07:49:58 +0900
tag     : Vimwiki project
toc     : true
public  : true
parent  : [[Project]]
latex   : false
---
* TOC
{:toc}

## 개요
이 위키는 John Grib님의 [Vimwiki skeleton repository](https://github.com/johngrib/johngrib-jekyll-skeleton){:target="_blank"} 를 fork하여 만들었다. 이 위키를 커스터마징해보자.

## 목표
* 현재 John Grib님이 운영하고 있는 위키에 추가된 기능을 적용해 본다.
* 나만의 스타일(디자인?)도 조금씩 적용해 본다.

## To-do
* [X] 현재 운영중인 위키에 추가된 기능 중 적용해 볼 것들
    * [X] 외부 링크를 표시하는 방법(2022.12.12.)
    * [X] 주석을 다는 부분(2022.12.12.)
* [o] 나만의 스타일로 구현할 부분
    * [X] tag에 배경색을 입혀서 텍스트와 구분해 보면 어떨까. (2022.12.12.)
    * [X] responsive top navigation 적용 (2022.12.14.)
        * w3schools.com에 있는 예제를 참고했는데 a 태그를 이용했더니 (href="javascript:void(0)") 외부링크로 인식하여 index화면에서 external-link.svg가 보여지는 현상 발생함
        * 각 페이지 링크마다 <a href="javascript:void(0)..."가 생성되 지저분해짐
        * a 태그를 버리고 button 태그로 다시 구현했더니 모든 증상 해결됨   
    * [ ] 검색창 상단 메뉴바 안으로 이동해보면 어떨까.
    * [ ] 메인 화면을 좀더 심플하게 바꿔보자.

