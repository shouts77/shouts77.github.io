---
layout  : wiki
title   : Ubuntu
summary : Ubuntu에 대해 알게된 것을 정리해 보자.
date    : 2023-01-05 17:05:28 +0900
updated : 2023-02-11 09:35:34 +0900
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


# 자료

## 도서

### 9% 1 / 11

* [X] (2023-01-31) Combining Commands
* [ ] Introducing The Shell
