---
layout  : wiki
title   : Ubuntu
summary : Ubuntu에 대해 알게된 것을 정리해 보자.
date    : 2023-01-05 17:05:28 +0900
updated : 2023-03-24 14:38:44 +0900
tag     : ubuntu study
resource: 24/1d4d84-2c49-4db6-9952-d1f51dd5ce8b
toc     : true
public  : true
parent  : [[Study]]
latex   : false
---
* TOC
{:toc}

# Ubuntu version: 20.04 LTS

# TIL

## 단축키
* CLI/GUI 모드 전환 (기본 부팅이 GUI일 경우)
    * CLI 모드 전환 : Ctrl + Alt + F3~F6
    * GUI 모드 전환 : Ctrl + F1~F2

* 화면잠금 : Super + l
* 로그아웃 : Ctrl + Alt + Del
* 터미널 창 열기 : Ctrl + Alt + T
* 윈도우
    * 화면 분할하기 : Super + 왼쪽/오른쪽 방향키
    * 전체화면/해제 : Super + 위쪽/아래쪽 방향키
    * 모든 창 최소화 하기 : Super + d
* 데스크톱 이동 : Super + Ctrl + 위쪽/아래쪽 방향키

## Linux Command Line
* md5sum
    * 중복파일 탐지 명령어 (examines a file’s contents and computes a 32-character string(checksum))
    * 예시
      ```
      $ md5sum *.jpg
      ```   

* 프로세스를 일시 중지하고 빠져나갔을 때 (Ctrl + z)
    * 터미널에서 `jobs` 명령어를 입력하면 중지된 프로세스 리스트를 볼 수 있음
    * `fg` 명령어는 가장 최근의 작업을 불러옴
    * `bg` 명령어는 가장 최근의 작업을 백그라운드로 실행함
    * `fg`, `bg` 명렁어 다음에 job number를 입력해 원하는 프로세스를 선택할 수 있음 (숫자 앞에 %를 붙임)
        * 예시 (1번 프로세스 fg 실행)
          ```
          $ fg %1
          ```   
    * `kill` 명령어는 가장 최근의 작업을 종료함
    * `kill` 명렁어로 원하는 작업을 종료할 경우 해당 작업의 숫자를 입력하면 되는데, 이 경우 반드시 %를 붙여야함. %를 붙이지 않을 경우 job number가 아니라 PID를 찾아 종료하게 됨
    * 참고 : [리눅스 Ctrl + z 사용법](https://steelcup.home.blog/2020/07/22/%EB%A6%AC%EB%88%85%EC%8A%A4-ctrl-z-%EC%82%AC%EC%9A%A9%EB%B2%95/) 

* history : 커맨드 히스토리 보기
    * `$ history -c` : clear(delete) the history for the currnet shell
    * `$ HISTSIZE=10000` : set memory size of history
    * `$ HISTFILESIZE=10000` : set maximum lines of history
    * `$ HISTCONTROL=ignoredups` : 중복 명령어 히스토리에서 제외 설정
    * `Ctrl + R`을 누르고 캐릭터(시작 부분 또는 중간 부분 또는 끝부분 캐릭터)를 입력하면 가장 최근의 커맨드가 검색됨 (엔터 누르면 실행)

* 커맨드 수정
    * (예시) `$ md5sum *.jg` 입력했을 때(jpg를 jg로 잘못 입력) `No such file or directory` 오류 발생
    * 다음 명령어로 `$ ^jg^jpg`로 입력하면 `$ md5sum *.jpg`로 실행됨
    * `s/(source)/(target)`을 활용할 수도 있음 `$ !!:s/jg/jpg/` 또는 `$ !md5sum:s/jg/jpg/`


* cd
    * 빠르게 경로를 이동하는 방법
        * shell 환경설정 파일(예 .bashrc)에 quick change directory 함수 만들기
        * shell 환경설정 파일에 `CDPATH`를 지정하면 경로 내 폴더명만으로도 쉽게 이동 가능
        * directory stack을 이용하는 방법 : `dirs`, `pushd`, `popd`
    * `$ cd -` : 바로 전 경로로 이동
    * generating CDPATH
    ```
    $ echo 'CDPATH=$HOME' \
       $(cd && ls -d */ | sed -e 's@^@$HOME/@' -e 's@/$@@') \
       .. \ | tr ' ' ':'
    ```

* awk : 텍스트 편집 프로그램 언어
    * 참고 : [awk wiki by John Grib](https://johngrib.github.io/wiki/awk/)

* sed : 스트림 편집기
    * 참고 : [sed wiki by John Grib](https://johngrib.github.io/wiki/cmd/sed/)

* man : Unix 매뉴얼 페이지를 찾아보는 명령
    * 참고 : [man wiki by John Grib](https://johngrib.github.io/wiki/cmd/man/)

## Shell
* interactive shell vs non-interactive shell
    * 참고 : [interactive shell vs non-interactive shell](https://mug896.github.io/bash-shell/interactive_non-interactive.html)

* login shell vs non-login shell
    * 참고 : [login shell vs non-login shell](https://anggeum.tistory.com/entry/Login-vs-Non-Login-Shell-etcprofile-bashrc)

* export : 변수를 현재 shell과 자녀 shell에서 사용할 수 있도록 해줌
    * 예시
      ```
      $ MY_VARIABLE=10      // A local variable
      $ export MY_VARIABLE  // Export it to become an environment variable
      ```

## 터미널 어플리케이션
* tmux
    * 참고
        * [우분투(Ubuntu)에 tmux 설치/세팅하기](https://seongkyun.github.io/others/2019/01/05/tmux/)   
        * [tmux 사용법 간단 정리](https://velog.io/@jeromecheon/tmux-%EC%82%AC%EC%9A%A9%EB%B2%95-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC)
        * [Tmux Tutorial 정리](https://y0c.github.io/2018/09/27/tmux-tutorial/)
        * [Tmux에서 Vim Color Scheme가 안될때](https://til.songyunseop.com/tmux/settings-for-vim-color-scheme.html)

# 자료

## 도서

### 100% 11 / 11 - Efficient Linux at the Command Line

<details>
<summary>진행단계</summary>
<div markdown="1">

* [X] (2023-01-31) Combining Commands
* [X] (2023-02-12) Introducing The Shell
* [X] (2023-02-13) Rerunning Commands
* [X] (2023-02-14) Cruising The Filesystem
* [X] (2023-02-23) Expanding Your Toolbox
* [X] (2023-02-25) Parents, Chidren, and Environments
* [X] (2023-03-23) 11 More Ways to Run a Command
* [X] (2023-03-23) Building A Brash One-Liner
* [X] (2023-03-23) Leveraging Text Files
* [X] (2023-03-24) Efficiency At The Keyboard
* [X] (2023-03-24) Final Time-Savers

</div>
</details>
