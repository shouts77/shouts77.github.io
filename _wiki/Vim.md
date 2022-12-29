---
layout  : wiki
title   : Vim
summary : Vim에 대해 알게 된 것을 정리해 보자. 
date    : 2022-12-15 22:24:39 +0900
updated : 2022-12-29 19:50:22 +0900
tag     : vim study 
resource: 51/031b60-fad5-498e-a6b3-e9104e7de479
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


* Vim을 종료하지 않고 터미널로 빠져나오기 (2022-12-29)
    * vim에서 파일을 수정 중에 `pause`키나 `Ctrl + z`키를 누르면 터미널로 빠져나옴
    * 터미널에서 `jobs`명령어를 치면 중단된(보류된, suspended) 프로세스 번호가 나오는데, 이 때 `fg %번호`를 입력하고 엔터를 치면 다시 Vim으로 복귀함


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
    
    * coc language server extension 관련 (2022-12-18)
        * 설치된 extension 보기 
          ```
          :CocList extensions
          ```
        * 설치된 extension 제거 (예. coc-html을 제거하는 경우)
          ```
          :CocUninstall coc-html
          ```
          [참조 자료](https://github.com/neoclide/coc.nvim/issues/1311#issuecomment-547225815)
          
    * coc-clangd 설치 (2022-12-29)
        * normal 모드에서 coc-clangd 설치
          ```
          :CocInstall coc-clangd
          ```
        * coc-settings.json이 없다면 `:CocConfig` 후 빈 파일 저장
        * clangd가 설치되지 않았을 경우 `vim test.c`처럼 파일명을 포함시켜서 vim을 실행시킨 후 `:CocCommand clangd.install` 실행
          

# 자료

## Web
* 자동완성 기능
    * John Grib, [vim 자동완성 기능 사용하기](https://johngrib.github.io/wiki/vim/auto-completion/)
    * John Grib, [Ultisnips](https://johngrib.github.io/wiki/vim/ultisnips/)
    * John Grib, [나의 공부 방법](https://johngrib.github.io/wiki/my-study-method/)

