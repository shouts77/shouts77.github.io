---
layout  : wiki
title   : Vim
summary : Vim에 대해 알게 된 것을 정리해 보자. 
date    : 2022-12-15 22:24:39 +0900
updated : 2022-12-18 17:37:29 +0900
tag     : vim study 
toc     : true
public  : true
parent  : [[Study]] 
latex   : false
---
* TOC
{:toc}

# 목표
* Vim을 자유롭게 활용하기

# 공부한 내용

## 기본 기능 관련
* 코드 자동 정렬 (2022-12-15)
    * 코드를 자동으로 정렬하려면 노멀 상태에서 gg=G라고 입력하면 됨
    * VS Code에서 그랬던 것 처럼 저장할 때마다 자동정렬되게 하면 좋을 것 같음 (BufWrite할 때마다)

## Plugin 사용 관련
* vim-fzf
    * 숨겨진 파일이 검색되지 않을 경우 대처 방법 (2022-12-18)
        * ag 패키지 설치
          ```
          brew install ag
          ```
          [ag 패키지 소개 자료](https://www.cyberciti.biz/open-source/command-line-hacks/ag-supercharge-string-search-through-directory-hierarchy/)
        * fzf 플러그인 관련 설정 추가 
          ```
          let $FZF_DEFAULT_COMMAND = 'ag --hidden --ignore .git -l -g ""'
          ```
          [설정관련 참조 자료](https://github.com/junegunn/fzf/issues/337)

* coc.vim
    * coc language server extension 관련(2022-12-18)
        * 설치된 extension 보기 
          ```
          :CocList extensions
          ```
        * 설치된 extension 제거 (예. coc-html을 제거하는 경우)
          ```
          CocUninstall coc-html
          ```
          [참조 자료](https://github.com/neoclide/coc.nvim/issues/1311#issuecomment-547225815)
          

# 자료

## Web
* 자동완성 기능
    * John Grib, [vim 자동완성 기능 사용하기](https://johngrib.github.io/wiki/vim/auto-completion/)
    * John Grib, [Ultisnips](https://johngrib.github.io/wiki/vim/ultisnips/)
    * John Grib, [나의 공부 방법](https://johngrib.github.io/wiki/my-study-method/)

