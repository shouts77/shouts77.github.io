---
layout  : wiki
title   : 정규 표현식
summary : 정규 표현식을 자유롭게 활용해 보자.
date    : 2022-12-17 22:12:36 +0900
updated : 2022-12-23 12:45:23 +0900
tag     : regex study
resource: 0d/54e289-c76c-4572-8de0-baed46b4dc74
toc     : true
public  : true
parent  : [[Study]]
latex   : false
---
* TOC
{:toc}

# 목표
* 정규 표현식을 자유롭게 활용하기

# RNT
* ag와 egrep 차이
    * ira<span style="color:red">q</span>
      ```
      echo iraq | ag 'q[^u]'
      ```
    * (검색 안됨)
      ```
      echo iraq | egrep 'q[^u]'
      ```


# 자료

## 도서

### 10% 1 / 10
* [X] Introduction To Regular Expressions
    * [X] (2022-12-18) Solving Real Problems
    * [X] (2022-12-18) Regular Expressions as a Language
    * [X] (2022-12-19) The Regular-Expression Frame of Mind
    * [X] (2022-12-20) Egrep Metacharacters
    * [X] (2022-12-23) Expanding the foundation
* [o] Extended Introductory Examples
    * [X] (2022-12-23) about the Examples
    * [X] (2022-12-23) Matching Text with Regular Expressions
    * [ ] Modifying Text with Regular Expressions

## Web
* John Grib, [정규 표현식 기본](https://johngrib.github.io/wiki/regex/basic/)
* John Grib, [rans 명령어](https://johngrib.github.io/wiki/rans-cmd/)

## Site
* [REGEXPER](https://regexper.com/)
* [regex2nfa](https://cyberzhg.github.io/toolbox/regex2nfa)

