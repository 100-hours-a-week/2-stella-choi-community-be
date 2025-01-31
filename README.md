## 서비스 개요

> 프로야구 팬들을 위한 커뮤니티 MOA 입니다. 
144경기의 즐거움을 공유하고 수집할 수 있는 공간을 마련했습니다!
> 

## Guide

### Requirements

- NodeJS
- NPM

### Installation

```bash
git clone https://github.com/100-hours-a-week/2-stella-choi-community-be.git
cd 2-stella-choi-community-be.git
```

### Run

1. 순서대로 명령어 실행

```bash
npm install
npm start
```

## Technical Stack

**Environment**

<img src="[https://img.shields.io/badge/-WebStorm-%000000?style=for-the-badge&logo=WebStorm&logoColor=white](https://img.shields.io/badge/-WebStorm-%23000000?style=for-the-badge&logo=WebStorm&logoColor=white)"> <img src="https://img.shields.io/badge/-Github-%23000000?style=for-the-badge&logo=Github&logoColor=white">

**Config**

<img src="https://img.shields.io/badge/-npm-23CB3837?style=for-the-badge&logo=npm&logoColor=white">

**Development**

<img src="https://img.shields.io/badge/-Node.js-%235FA04E?style=for-the-badge&logo=Node.js&logoColor=black"> <img src="https://img.shields.io/badge/-JavaScript-%23F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">

**Deploy**

<img src="https://img.shields.io/badge/-githubactions-%2088FF?style=for-the-badge&logo=githubactions&logoColor=white"> <img src="https://img.shields.io/badge/-docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

## Architecture

```jsx
📦community-be
 ┣ 📂.github
 ┃ ┣ 📂ISSUE_TEMPLATE
 ┃ ┃ ┣ 📜bug-report.md
 ┃ ┃ ┣ 📜feature-생성-등록.md
 ┃ ┃ ┣ 📜refactor-request.md
 ┃ ┃ ┗ 📜self-bug-report.md
 ┃ ┣ 📂workflows
 ┃ ┃ ┗ 📜CICD.yml
 ┃ ┗ 📜PULL_REQUEST_TEMPLATE.md
 ┣ 📂config
 ┃ ┣ 📂logs
 ┃ ┃ ┣ 📂board
 ┃ ┃ ┣ 📂comment
 ┃ ┃ ┣ 📂error
 ┃ ┃ ┣ 📂exception
 ┃ ┃ ┣ 📂like
 ┃ ┃ ┗ 📂user
 ┣ 📂constants
 ┃ ┣ 📜responseMessage.js
 ┃ ┗ 📜statusCode.js
 ┣ 📂controllers
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📜deleteBoard.js
 ┃ ┃ ┣ 📜getAllBoard.js
 ┃ ┃ ┣ 📜getBoard.js
 ┃ ┃ ┣ 📜postBoard.js
 ┃ ┃ ┣ 📜postViewCount.js
 ┃ ┃ ┗ 📜putBoard.js
 ┃ ┣ 📂comment
 ┃ ┃ ┣ 📜deleteComment.js
 ┃ ┃ ┣ 📜patchComment.js
 ┃ ┃ ┗ 📜postComment.js
 ┃ ┣ 📂like
 ┃ ┃ ┣ 📜deleteLike.js
 ┃ ┃ ┣ 📜getLike.js
 ┃ ┃ ┗ 📜postLike.js
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📜deleteUser.js
 ┃ ┃ ┣ 📜getUser.js
 ┃ ┃ ┣ 📜loginUser.js
 ┃ ┃ ┣ 📜logoutUser.js
 ┃ ┃ ┣ 📜patchUser.js
 ┃ ┃ ┣ 📜patchUserPassword.js
 ┃ ┃ ┗ 📜postUser.js
 ┣ 📂libs
 ┃ ┣ 📜dateFormat.js
 ┃ ┗ 📜util.js
 ┣ 📂middlewares
 ┃ ┣ 📜auth.js
 ┃ ┗ 📜multer.js
 ┣ 📂models
 ┃ ┣ 📂data
 ┃ ┃ ┣ 📜board.json
 ┃ ┃ ┣ 📜comment.json
 ┃ ┃ ┣ 📜like.json
 ┃ ┃ ┗ 📜user.json
 ┃ ┣ 📜boardDB.js
 ┃ ┣ 📜boardJson.js
 ┃ ┣ 📜commentDB.js
 ┃ ┣ 📜commentJson.js
 ┃ ┣ 📜db.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜likeDB.js
 ┃ ┣ 📜likeJson.js
 ┃ ┣ 📜userDB.js
 ┃ ┗ 📜userJson.js
 ┣ 📂routes
 ┃ ┣ 📂v1
 ┃ ┃ ┣ 📜boardRoute.js
 ┃ ┃ ┣ 📜commentRoute.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜likeRoute.js
 ┃ ┃ ┗ 📜userRoute.js
 ┃ ┗ 📜index.js
 ┣ 📂script
 ┃ ┗ 📜move_logs_to_storage.sh
 ┣ 📂uploads
 ┃ ┣ 📂others
 ┃ ┣ 📂posts
 ┃ ┗ 📂profiles
 ┣ 📂utils
 ┃ ┣ 📂morganLogger
 ┃ ┃ ┣ 📜morganBoardAPILogger.js
 ┃ ┃ ┣ 📜morganCommentAPILogger.js
 ┃ ┃ ┣ 📜morganLikeAPILogger.js
 ┃ ┃ ┗ 📜morganUserAPILogger.js
 ┃ ┗ 📜winstonLogger.js
 ┣ 📜.dockerignore
 ┣ 📜.env.develop
 ┣ 📜.env.local
 ┣ 📜.env.production
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜Dockerfile
 ┣ 📜DockerfileDev
 ┣ 📜README.md
 ┣ 📜eslint.config.js
 ┣ 📜index.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜prettier.config.js
```

## Main Directory

| **디렉터리** | **설명** |
| --- | --- |
| **.github/** | github 템플릿 및 워크플로우 관리 |
| **constants** | API 응답 메시지와 상태 코드를 관리하는 상수 파일 저장 |
| **controllers** | 요청에 대한 비즈니스 로직 처리를 담당하는 디렉터리 |
| **libs** | 재사용 가능한 유틸리티 함수들을 관리하는 디렉터리 |
| **middlewares** | Express 미들웨어 관리 |
| **models** | 데이터베이스 로직을 처리하는 디렉터리 |
| **routes** | 각 API 경로를 정의 |
| **script** | 자동화 스크립트를 위한 디렉터리(로그 데이터 이동) |
| **uploads** | 업로드된 사진이 저장되는 디렉터리 |
| **utils** | 로그 데이터 저장을 처리하는 디렉터리 |
| **config/logs** | 로그 데이터 저장 디렉터리 |
| **node_modules/** | 프로젝트에 설치된 의존성 모듈 디렉터리 |

## API Docs

### 회원가입

| 요청 방식 | URL | Body | 설명 | 응답 상태 코드 | 응답 메시지 | 추가 요구 사항 |
| --- | --- | --- | --- | --- | --- | --- |
| POST | `/api/v1/users/` | `json { "email" : "test@startupcode.kr", "password" : "test1234", "password_check" : "test1234", "nickname" : "startup", "profile_image" : "<https://image.kr/img.jpg>" }` | 필수 필드: `email`, `password`, `password_check`, `nickname`, `profile_image` | `201` | `json { "message" : "REGISTER_SUCCESS", "data" : null }` | 비밀번호 조건: 8자 이상, 20자 이하, 대문자/소문자/숫자/특수문자 최소 1개 포함 |
|  |  |  |  | `400` | `json { "message" : "NOT_SAME_PASSWORD", "data" : null }` | 패스워드와 패스워드 확인이 다를 때 |
|  |  |  |  | `400` | `json { "message" : "MISSING_FIELD", "data" : null }` | 필드 값이 없을 때 |
|  |  |  |  | `400` | `json { "message" : "INVALID_FORMAT", "data" : null }` | 비밀번호 조건 불충족, 닉네임 10자 초과 또는 띄어쓰기 포함, 이메일 형식 오류 |
|  |  |  |  | `400` | `json { "message" : "DUPLICATE_NICKNAME", "data" : null }` | 닉네임이 중복될 때 |
|  |  |  |  | `400` | `json { "message" : "DUPLICATE_EMAIL", "data" : null }` | 이메일이 중복될 때 |
|  |  |  |  | `500` | `json { "message" : "INTERNAL_SERVER_ERROR", "data" : null }` | 서버 오류 발생 |

---

### 로그인

| 요청 방식 | URL | Body | 설명 | 응답 상태 코드 | 응답 메시지 | 추가 요구 사항 |
| --- | --- | --- | --- | --- | --- | --- |
| POST | `/api/v1/users/login` | `json { "email" : "test@startupcode.kr", "password" : "test1234" }` | 필수 필드: `email`, `password` | `200` | `json { "message" : "LOGIN_SUCCESS", "data" : null }` | `Set-Cookie: SESSION_ID=123;` 설정 |
|  |  |  |  | `400` | `json { "message" : "MISSING_FIELD", "data" : null }` | 필드 값이 없을 때 |
|  |  |  |  | `400` | `json { "message" : "INVALID_EMAIL_FORMAT", "data" : null }` | 이메일 형식 오류 |
|  |  |  |  | `401` | `json { "message" : "INVALID_PASSWORD", "data" : null }` | 비밀번호 불일치 |
|  |  |  |  | `404` | `json { "message" : "NO_USER", "data" : null }` | 해당 이메일 계정 없음 |
|  |  |  |  | `500` | `json { "message" : "INTERNAL_SERVER_ERROR", "data" : null }` | 서버 오류 발생 |

---

### 회원 정보 조회

| 요청 방식 | URL | Header | 설명 | 응답 상태 코드 | 응답 메시지 | 추가 요구 사항 |
| --- | --- | --- | --- | --- | --- | --- |
| GET | `/api/v1/users/` | `session: session_id` | 세션을 이용해 사용자 정보 조회 | `200` | `json { "message" : "GET_INFO_SUCCESS", "data" : { "email" : "test@startupcode.kr", "profile_image" : "<https://image.kr/img.jpg>", "nickname": "startup" } }` |  |
|  |  |  |  | `400` | `json { "message" : "MISSING_SESSION", "data" : null }` | 세션이 전달되지 않음 |
|  |  |  |  | `401` | `json { "message" : "UNAUTHORIZED", "data" : null }` | 잘못된 세션 정보 |
|  |  |  |  | `404` | `json { "message" : "NOT_FOUND_USER", "data" : null }` | 세션 인증 후 해당 유저 없음 |
|  |  |  |  | `500` | `json { "message" : "INTERNAL_SERVER_ERROR", "data" : null }` | 서버 오류 발생 |

---

### 회원 정보 수정

| 요청 방식 | URL | Body | 설명 | 응답 상태 코드 | 응답 메시지 | 추가 요구 사항 |
| --- | --- | --- | --- | --- | --- | --- |
| PATCH | `/api/v1/users/` | `json { "email": "yulim38392@naver.com", "nickname": "스우", "profile_image": "uploads/profiles/userprofile5.png", "user_id": 10 }` | `profile_image`, `nickname` 둘 중 하나만 있어도 수정 가능 | `200` | `json { "message" : "EDIT_PROFILE_SUCCESS", "data" : null }` | 닉네임: 10자 이내, 띄어쓰기 없음 |
|  |  |  |  | `400` | `json { "message" : "MISSING_FIELD", "data" : null }` | 닉네임, 프로필 둘 다 없을 때 |
|  |  |  |  | `400` | `json { "message" : "INVALID_NICKNAME", "data" : null }` | 닉네임 조건 불충족 |
|  |  |  |  | `400` | `json { "message" : "DUPLICATE_NICKNAME", "data" : null }` | 중복된 닉네임 |
|  |  |  |  | `400` | `json { "message" : "MISSING_SESSION", "data" : null }` | 세션이 전달되지 않음 |
|  |  |  |  | `401` | `json { "message" : "UNAUTHORIZED", "data" : null }` | 잘못된 세션 정보 |
|  |  |  |  | `404` | `json { "message" : "NOT_FOUND_USER", "data" : null }` | 세션 인증 후 해당 유저 없음 |
|  |  |  |  | `500` | `json { "message" : "INTERNAL_SERVER_ERROR", "data" : null }` | 서버 오류 발생 |

---

https://docs.google.com/spreadsheets/d/1vEVtDn_lNIak1mK1KhR4HlBKtYYKEBccqBD9WPBAJjE/edit?usp=sharing

## CI/CD Strategy

![image](https://github.com/user-attachments/assets/9ab13dd5-eb55-4bbd-81f5-c2475c923c03)


- Github Actions
    - workflows 내 yml 파일에 정의된 순서대로 새로운 내용 업데이트시 배포 진행
    - `main` 브랜치와 `develop` 브랜치별 다른 Docker 환경으로 배포됨
        - 브랜치별 merge된 내용이 각 환경으로 배포됨
    - 각 환경별 다른 env 파일 필요
        - `.env.local` : 로컬 환경에서 사용되는 환경변수
        - `.env.develop` : 개발 환경에서 사용되는 환경변수
        - `.env.production` : 운영 환경에서 사용되는 환경변수
- GHCR
    - 빌드된 Docker Image 저장되는 이미지 저장소
- EC2 내로 SSH 명령어 전달
    - 기존 이미지 삭제
    - `docker pull 이미지`
    - `docker run 이미지`
    

## Additional Function

### Log 수집

- `moranLogger` , `winstonLogger` 를 활용한 로그 수집
- 로그 수집 후 12시에 자동으로 특정 서버로 전송되고 기존 파일은 삭제됨
- `move_logs_to_storage.sh` 에 해당 과정 정의되어있음

### 이미지 저장

- `multer` 를 활용한 프로필 및 게시글 이미지 저장
- 이후 `S3` 나 파일 서버를 구축해서 옮길 예정
