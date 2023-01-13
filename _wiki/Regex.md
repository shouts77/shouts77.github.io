---
layout  : wiki
title   : 정규 표현식
summary : 정규 표현식을 자유롭게 활용해 보자.
date    : 2022-12-17 22:12:36 +0900
updated : 2023-01-13 09:05:37 +0900
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

# TIL

## Defining vague matchers in Regex
* `\d` : 0~9 사이 숫자 (digit character)
* `\w` : 숫자, 문자 (word character)
* `\D` : except digit character
* `\W` : except word character

* `\b` : 단어(w)사이의 경계
* `\1` : 1~9까지 숫자를 사용할 수 있으며, 괄호로 묶여진 그룹을 호출

## Capture Group (Javascipt)
* 정규 표현식에서 괄호로 둘러싼 영역
* match 메소드 실행 시 첫번째는 전체 매칭 문자열이, 두번째부터는 캡처링 그룹 안에 있는 문자열이 차례로 들어감[^capturing-group]
* 괄호 안에 `?:`가 포함되어 있을 경우 이 괄호는 캡처하지 않겠다는 의미임 (Non-Capter Group)

## Quantifiers
* `?` : 물음표는 {0,1} 의미 (zero or one occurrence)
* `+` : 더하기는 {1,} 의미 (one or more occurrence)
* `*` : 곱하기는 {0,} 의미 (zero or more occurrence)

> Greedy/Nongreedy Qunatifiers
* `*` : greedy approach (maximum number of options)
* `?` : nongreedy approach (minimum number of options)

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

## Web
* John Grib, [정규 표현식 기본](https://johngrib.github.io/wiki/regex/basic/)
* John Grib, [rans 명령어](https://johngrib.github.io/wiki/rans-cmd/)

## Site
* [regex101](https://regex101.com/)
* [REGEXPER](https://regexper.com/)
* [regex2nfa](https://cyberzhg.github.io/toolbox/regex2nfa)


## 도서

### 100% 10 / 10 - An Intorduction to Regular Expressions

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

### 100% 6 / 6 - JavaScript Regular Expressions

<details>
<summary>진행단계</summary>

<div markdown="1">

* [X] (2022-12-29) Getting Started with Regex
* [X] (2023-01-02) The Basics
* [X] (2023-01-07) Special Characters
* [X] (2023-01-13) Regex in Practice
* [X] (2023-01-13) Node.js and Regex
* [X] (2023-01-13) JavaScript Regex Cheat Sheet   

</div>
</details>

# 주석
[^capturing-group]: [자바스크립트 정규 표현식의 capturing group 참조](https://blog.rhostem.com/posts/2018-11-11-regex-capture-group)
