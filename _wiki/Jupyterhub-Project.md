---
layout  : wiki
title   : Jupyterhub-Project 
summary : 윈도우에서 도커 엔진으로 Jupyterhub 운영이 가능하다.
date    : 2022-12-07 13:43:48 +0900
updated : 2023-02-25 16:08:25 +0900
tag     : jupyterhub docker wsl2 project
resource: 3b/303e12-70e9-44aa-9bdc-b6dff6cc3b64
toc     : true
public  : true
parent  : [[Project]] 
latex   : false
---
* TOC
{:toc}

## 개요
* Window WSL2에 Jupyterhub를 구축하는 프로젝트이다.
* 유료화로 변경된 도커 데스크탑이 아닌 도커 엔진을 활용하였다.

## 구축환경
* Window11 WSL2 + Ubuntu 22.04.1 LTS + Docker Engine with Jupyterhub Image

## 프로세스
* Window11 WSL2에 Ubuntu 설치
* Ubuntu에 Docker Engine 설치
* Docker Jupyterhub Image로 컨테이너 생성
* Jupyterhub 서비스를 위해 테스트 중

## Issues
* [X] WSL2 사용 시 WSL을 실행할 때 마다 port가 변경되는 부분
    * [깃헙 WSL 이슈](https://github.com/microsoft/WSL/issues/4150){:target="_blank"} 내용을 토대로 해결
* [ ] Docker Volume 사용 시 Jupyterhub proxy port와 충돌(?)되어 서비스 실행 불가
    * Volume 마운트 시에도 같은 증상임
    * 우선은 Volume없이 테스트 중
    * Jupyterhub proxy와 관련해서 좀 더 살펴 볼 필요 있음
* [ ] 윈도우를 재부팅하지 않고 켜둘 경우 시스템이 중단되는 증상
    * 우선은 매일 윈도우를 자동 리부트하고 스크립트를 실행하여 서비스가 유지될 수 있도록 조치함(2022.12.02)
* [X] 도커 실행 시 'cannot connect to docker daemon' 오류 발생
    * unset DOCKER_HOST, DOCKER_TLS_PATH, DOCKER_VERIFY
      ```
      unset DOCKER_HOST
      unset DOCKER_TLS_PATH
      unset DOCKER_VERIFY
      ```
    * 참고 : [THINK-PRO BLOG 해결 방법](https://thinkpro.tistory.com/149)

## 참고문서
* [도커 데스크톱 없이 구축하는 WSL2와 도커 개발 환경](https://netmarble.engineering/docker-on-wsl2-without-docker-desktop/){:target="_blank"}  

