---
layout  : wiki
title   : 정규 표현식
summary : 정규 표현식을 자유롭게 활용해 보자.
date    : 2022-12-17 22:12:36 +0900
updated : 2022-12-24 21:10:27 +0900
tag     : regex study
resource: 0d/54e289-c76c-4572-8de0-baed46b4dc74
toc     : true
public  : true
parent  : [[Study]]
latex   : true
---
* TOC
{:toc}

# 목표
* 정규 표현식을 자유롭게 활용하기

# 정규 표현식 기초 (필요한 부분만 정리)

## Quantifiers
* `?` : 물음표는 {0,1} 의미
* `+` : 더하기는 {1,} 의미
* `*` : 곱하기는 {0,} 의미

## Wildcards
* `.*` : This is often used to match any text.

## Prefixes and Suffixes
* 예시1 : `(?<=[A-Z]+)[0-9]+` 정규 표현식과 일치하는 문자 뒷 부분의 숫자만 매치시킴
* 예시2 : `[0-9]+(?=[A-Z]+)` 정규 표현식과 일치하는 문자 앞 부분의 숫자만 매치시킴

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

### 100% 1 / 1 - An Intorduction to Regular Expressions

<details>
<summary>진행단계</summary>

<div markdown="1">

* [X] (2022-12-24) Setting Up
* [X] (2022-12-24) Literals and Special Characters
* [X] (2022-12-24) Character Ranges
* [X] (2022-12-24) Anchors
* [X] (2022-12-24) Quantifiers
* [X] (2022-12-24) Wildcards
* [X] (2022-12-24) Grouping
* [X] (2022-12-24) Alternation
* [X] (2022-12-24) Prefixes and Suffixes
* [X] (2022-12-24) Conclusions

</div>
</details>

### 10% 1 / 10 

<details>
<summary>진행단계</summary>

<div markdown="1">

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

</div>
</details>

## Web
* John Grib, [정규 표현식 기본](https://johngrib.github.io/wiki/regex/basic/)
* John Grib, [rans 명령어](https://johngrib.github.io/wiki/rans-cmd/)

## Site
* [REGEXPER](https://regexper.com/)
* [regex2nfa](https://cyberzhg.github.io/toolbox/regex2nfa)

