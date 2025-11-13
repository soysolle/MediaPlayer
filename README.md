# CSE4103
2024년 2학기 커넥티드플랫폼이론과실제(캡스톤디자인)<br>4조 프로젝트

# Introduction

<img src="https://i.ibb.co/1mTW2Sh/image.png" alt="image">

'킹받챠'는 영상 재생 중 베스트 댓글 플로팅 기능을 추가한 webOS 기반의 미디어 플레이어입니다.

## 기술 스택

-   FE: Enact
-   BE: Node.js, Express.js
-   DB: MySQL
                                                                 |
# Architectural Drivers
## Functional Requirements

-   사용자 인증
    -   회원 가입
    -   로그인
-   영상 탐색
    -   영상 목록 조회수, 좋아요 기준 조회
    -   영상 검색
    -   카테고리별 필터링
-   영상 재생 및 이어보기
    -   영상 콘텐츠 재생
    -   여러 기기 간 재생 시간 동기화
    -   이전 시청 기록에서 자동 이어보기
-   재생 시점 기반 댓글 상호작용
    -   영상 재생 중 특정 시간대 베스트 댓글 표시
    -   영상 재생 중 타임스탬프와 함께 댓글 기록

# Architecture Overview

![Architecture Diagram](https://github.com/user-attachments/assets/e52500b5-929a-405a-ba91-21fe36cce6af)

## Frontend Architecture

-   Authentication
    -   로그인 및 회원가입 화면
    -   Axios를 사용한 백엔드 API 요청 처리
    -   상태 관리를 통한 화면 전환
-   Home
    -   동영상 목록 표시 및 카테고리 탭 제공
    -   동영상 선택 시 상세 화면으로 전환
-   System Monitoring
    -   CPU 및 메모리 사용량 그래프 표시
    -   실시간 데이터 구독 및 시각화
-   UI Components
    -   TabLayout, Media, Detail 등 재사용 가능한 UI 구성 요소 활용
    -   Enact 라이브러리를 기반으로 한 디자인 시스템 사용

## Backend Architecture

-   User
    -   JWT를 통한 사용자 인증
    -   암호화된 비밀번호 저장
-   Video
    -   동영상 관련 클라이언트 요청 처리
-   Comment
    -   댓글 관련 클라이언트 요청 처리
-   데이터베이스
    -   MySQL2 라이브러리를 사용해 MySQL 데이터베이스와 직접 통신

# Data Design
![Data Design Diagram](https://github.com/user-attachments/assets/3dcba787-278d-419e-b813-9b1083b585c5)

# 기타
## 프레임워크 선택
### Node.js, Express.js
클라이언트와 서버 간 JSON 형식의 데이터를 주고받기 용이한 Node.js를 선택하였으며, 빠른 개발과 미들웨어 관리의 편의성을 제공하는 Express.js를 추가로 적용하였습니다.

### MySQL
초기에 NoSQL 데이터베이스를 고려했지만, 리소스 간 연결성이 짙다고 판단하여 관계형 데이터베이스인 MySQL을 선택했습니다.

## 동영상, 댓글 좋아요 수 반정규화
동영상과 댓글의 좋아요 수를 기준으로 정렬하거나 조회할 때, join 연산이 과도하게 발생하여 시스템 성능 저하가 우려되었습니다. 이를 해결하기 위해 video와 comment 테이블에 각각 좋아요 수를 저장하는 like 필드를 추가하였습니다.

### gain
- 조회 속도 증가
### loss
- 데이터 정합성 문제 -> 트랜잭션을 통해 대처
- 쓰기 작업 증가
