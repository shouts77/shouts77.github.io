---
layout  : wiki
title   : Jupyterhub-Project 
summary : 
date    : 2022-12-07 13:43:48 +0900
updated : 2022-12-07 14:11:51 +0900
tags    : #jupyterhub #python #wsl #docker 
toc     : true
public  : true
parent  : [[index]] 
latex   : false
---
* TOC
{:toc}

## 개요
* Window WSL에 우분투를 설치하고 docker-engine(docker-desktop 아님)을 활용해 Jupyterhub를 구축하는 프로젝트이다.

## 구축환경
* Window11 WSL2 + Ubuntu 22.04.1 LTS + Docker Engine with Jupyterhub Image

## 프로세스
* Window11 WSL2에 Ubuntu 설치
* Ubuntu에 Docker Engine 설치
* Docker Jupyterhub Image로 컨테이너 생성
* Jupyterhub 서비르를 위해 테스트 중

## Issues
* WSL2 사용 시 WSL을 실행할 때 마다 port가 변경되는 부분
    * [깃헙 WSL 이슈](https://github.com/microsoft/WSL/issues/4150) 내용 토대로 해결
* Docker Volume 사용 시 Jupyterhub proxy port와 충돌(?)되어 서비스 실행 불가
    * Volume 마운트 시에도 같은 증상임
    * 우선은 Volume없이 테스트 중
    * Jupyterhub proxy와 관련해서 좀 더 살펴 볼 필요 있음
* 윈도우를 재부팅하지 않고 켜둘 경우 시스템이 중단되는 증상
    * 우선은 매일 윈도우를 자동 리부트하고 스크립트를 실행하여 서비스가 유지될 수 있도록 조치함(2022.12.02)
