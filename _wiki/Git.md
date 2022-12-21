---
layout  : wiki
title   : Git 
summary : Git에 대해 알게 된 것을 정리해 보자.
date    : 2022-12-11 21:05:06 +0900
updated : 2022-12-21 20:35:29 +0900
tag     : git study 
resource: 2d/dc08a3-173b-4101-89d2-7386f24beb5b
toc     : true
public  : true
parent  : [[Study]] 
latex   : false
---
* TOC
{:toc}

# 목표
* git을 자유롭게 활용하기

# 공부한 내용
* Pull Request (2022-12-11)
    * github에서 Pull Request(PR)를 하려면 PR용으로 별도의 branch를 만들 필요 있음
    * 지금까지 커밋한 내용 중에서 일부만 PR하려면 별도 branch에 해당 커밋만 cherry-pick하여 push한 후 PR진행하면 됨
    * 참고: [cherry-pick](https://msyu1207.tistory.com/entry/cherry-pick-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%9B%90%ED%95%98%EB%8A%94-commit%EB%A7%8C-pr%EC%9D%84-%EC%98%AC%EB%A0%A4%EB%B3%B4%EC%9E%90){:target="_blank"}   
* git stash (2022-12-11)
    * 작업을 완료하지 못해서 커밋을 하기 어려운 경우 stash로 지금까지 작업한 내용을 저장할 수 있음
    * 만약 새로운 파일을 만들었을 경우 untracked file이라는 메세지가 나오며 stash가 안되는데 이 경우는
    ```
    git stash --include-untracked
    ```
    로 stash에 추가할 수 있음
    * 참고: [stash관련 명령어](https://gmlwjd9405.github.io/2018/05/18/git-stash.html){:target="_blank"}   


# 자료

## 도서

### 30% 3 / 10
* [X] (2022-12-19) 0. How To use This Book:Intro
* [X] (2022-12-20) 1. Beginning Git: Get Going With Git
* [X] (2022-12-21) 2. Branching Out: Multiple Trains Of Thoughts
* [ ] 3. Looking Around: Investigating Your Git Repository
