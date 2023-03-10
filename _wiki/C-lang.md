---
layout  : wiki
title   : C언어 
summary : C언어를 이해하자.
date    : 2022-12-11 20:56:45 +0900
updated : 2023-02-14 08:50:33 +0900
tag     : c study
resource: ef/623fa9-b252-49a4-961d-61ccc30a70bd
toc     : true
public  : true
parent  : [[Study]] 
latex   : false
---
* TOC
{:toc}

# 목표
* C언어의 이해

# TIL
* 메모리
    * 1비트가 증가할 때마다 저장 단위가 2의 배수만큼 늘어남
        * 예. 1비트는 10진수 숫자 0~1 중 하나, 2비트는 10진수 숫자 0~3중 하나, 3비트튼 10진수 숫자 0~7 중 하나 저장할 수 있음 (2진수로 저장)
    * 비트가 8개 모이면 바이트(Byte)라고 함
        * 1바이트는 10진수 숫자 0~255 중 하나 저장 가능
        * 1,024 Byte = 1 KB
        * 1,024 KB = 1 MB
        * 1,024 MB = 1 GB
        * 1,024 GB = 1 TB
        * 1,024 TB = 1 PB (페타바이트)
        * 1,024 PB = 1 EB (엑사바이트)

* 자료형의 메모리 크기
    * (signed / unsigned) char : 1바이트 (8비트) 
    * (signed / unsigned) short int : 2바이트
    * (signed / unsigned) long int : 4바이트
    * float : 4바이트 (부호 1비트, 지수부 8비트, 가수부 23비트)
    * double : 8바이트 (부호 1비트, 지수부 11비트, 가수부 52비트)

* 상수 크기 및  컴파일 후 변경 형태 (값의 범위나 컴파일러에 따라 크기는 다를 수 있음)

| 구분 | 크기(byte) | 크기(bit) | 변경 형태                   |
|:----:|:----------:|:---------:|-----------------------------|
| 정수 | 4          | 32        | 2진수                       |
| 실수 | 8          | 64        | IEEE 754 표준 double형      |
| 문자 | 4          | 32        | 아스키 코드 값과 같은 2진수 |

* C언어 출력타입
<div id="table1"></div>
- th
    - 표기
    - 내용
- tr
    - %d
    - 10진수(정수형)
- tr
    - %f
    - 실수형
- tr 
    - %e
    - 지수형
- tr
    - %o
    - 8진수
- tr
    - %x
    - 16진수
- tr
    - %u
    - 부호없는 10진수
- tr
    - %g
    - 실수형 자동출력
- tr
    - %p
    - 포인터의 주소
- tr
    - %c
    - 하나의 문자로 출력
- tr
    - %s
    - 문자열
{:class="table-generate" data-target-id="table1"}

* 포인터
    * 메모리의 주소[^memory-address]
        * 메모리 위치를 식별하는 주소 값은 바이트 단위로 구분
        * 0부터 시작하고 바이트 단위로 1씩 증가
        * 2바이트 이상의 크기를 갖는 변수는 여러 개의 주소값에 걸쳐 할당됨
        * ex. int형 변수가 100번지부터 할당되었다면 100번지부터 103번지까지 4바이트에 걸쳐 할당됨

    * C언어 포인터 자료형의 크기[^memory-address2]
        * 자료형에 상관없이 32bit 운영체제(컴파일러)에서는 4바이트, 64bit 운영체제(컴파일러)에서는 8바이트로 할당
        * 포인터 자료형의 크기와 포인터가 가리키는 자료형의 크기를 혼동하면 안됨

    * 포인터와 배열
        * 배열명은 첫 번째 배열 요소의 주소값임



# RNT
* 시프트 연산자와 비트 연산자

# 자료

## 도서

### 100% 576 / 576 - Do it! C언어 입문

<details>
<summary>진행단계</summary>
<div markdown="1">

* [X] 첫째마당 C언어 기본문법
    * [X] (2022-12-01) 프로그램과 C언어
    * [X] (2022-12-01) C언어로 만드는 첫번째 프로그램
    * [X] (2022-12-01) 자료형
    * [X] (2022-12-01) 상수와 변수
    * [X] (2022-12-01) 함수
    * [X] (2022-12-01) 표준 출력 함수
    * [X] (2022-12-01) 연산자
    * [X] (2022-12-01) 조건문
    * [X] (2022-12-17) 반복문
    * [X] (2022-12-17) 시프트 연산자와 비트 연산자
    * [X] (2022-12-17) 지역 변수와 전역 변수
* [X] 둘째마당 C언어 완성하기
    * [X] (2022-12-19) 배열과 문자열
    * [X] (2022-12-26) 포인터
    * [X] (2022-12-27) 표준 입력 함수
    * [X] (2022-12-28) 배열과 포인터
    * [X] (2022-12-28) 메모리 할당
    * [X] (2022-12-29) 다차원 포인터
    * [X] (2022-12-29) 구조체와 연결 리스트
    * [X] (2022-12-29) 함수 포인터
 
</div>
</details>

### 100% 665 / 665 - 혼자 공부하는 C언어

<details>
<summary>진행단계</summary>
<div markdown="1">

* [X] Chapter01 프로그램 만들기
    * [X] (2022-12-29) 프로그램과 C언어
    * [X] (2022-12-29) 컴파일과 컴파일러 사용법
* [X] Chapter02 상수와 데이터 출력
    * [X] (2022-12-29) C 프로그램 구조와 데이터 출력 방법
    * [X] (2022-12-29) 상수와 데이터 표현 방법
* [X] Chapter03 변수와 데이터 입력
    * [X] (2022-12-30) 변수
    * [X] (2023-01-02) 데이터 입력
* [X] Chapter04 연산자
    * [X] (2023-01-02) 산술 연산자, 관계 연산자, 논리 연산자
    * [X] (2023-01-02) 그 외 유용한 연산자
* [X] Chapter05 선택문
    * [X] (2023-01-03) if문
    * [X] (2023-01-03) if문 활용과 switch~case문
* [X] Chapter06 반복문
    * [X] (2023-01-07) while문, for문, do~while문
    * [X] (2023-01-07) 반복문 활용
* [X] Chapter07 함수
    * [X] (2023-01-09) 함수의 작성과 사용
    * [X] (2023-01-09) 여러가지 함수 유형
* [X] Chapter08 배열
    * [X] (2023-01-10) 배열의 선언과 사용
    * [X] (2023-01-10) 문자를 저장하는 배열
* [X] Chapter09 포인터
    * [X] (2023-01-10) 포인터의 기본 개념
    * [X] (2023-01-12) 포인터 완전 정복을 위한 포인터 이해하기
* [X] Chapter10 배열과 포인터
    * [X] (2023-01-12) 배열과 포인터의 관계
    * [X] (2023-01-20) 배열을 처리하는 함수
* [X] Chapter11 문자
    * [X] (2023-01-20) 아스키 코드 값과 문자 입출력 함수
    * [X] (2023-01-20) 버퍼를 사용하는 입력 함수
* [X] Chapter12 문자열
    * [X] (2023-01-20) 문자열과 포인터
    * [X] (2023-01-20) 문자열 연산 함수
* [X] Chapter13 변수의 영역과 데이터 공유
    * [X] (2023-01-27) 변수 사용 영역
    * [X] (2023-01-27) 함수의 데이터 공유 방법
* [X] Chapter14 다차원 배열과 포인터 배열
    * [X] (2023-01-30) 다차원 배열
    * [X] (2023-01-30) 포인터 배열
* [X] Chapter15 응용 포인터
    * [X] (2023-02-07) 이중 포인터와 배열 포인터
    * [X] (2023-02-07) 함수 포인터와 void 포인터
* [X] Chapter 16 메모리 동적 할당
    * [X] (2023-02-09) 동적 할당 함수
    * [X] (2023-02-09) 동적 할당 저장 공간의 활용
* [X] Chapter17 사용자 정의 자료형
    * [X] (2023-02-10) 구조체
    * [X] (2023-02-13) 구조체 활용, 공용체, 열거형
* [X] Chapter18 파일 입출력
    * [X] (2023-02-13) 파일 개방과 입출력
    * [X] (2023-02-13) 다양한 파일 입출력 함수
* [X] Chapter19 전처리와 분할 컴파일
    * [X] (2023-02-14) 전처리 지시자
    * [X] (2023-02-14) 분할 컴파일

</div>
</details>

# 주석
[^memory-address]: 서현우, 혼자 공부하는 C언어, 한빛미디어, 2019, p235 참조
[^memory-address2]: [c언어 포인터의 기본 개념 이해하기 2](https://swpfun.tistory.com/598)
