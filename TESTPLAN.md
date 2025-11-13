# 킹받챠 TEST Plan

## Backend Unit Test Cases

backend api의 검증은 Jest 모듈을 활용하여 unit test를 수행하였다.

| API                            | Test Name                                    | TEST Case ID | Description                                                                                                                                                                                                                                                                       | Test Data                                                                  |
| ------------------------------ | -------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| /auth/signup                   | 회원가입                                     | TC01-1       | <li>Status code is 201: api의 response의 status 코드가 201이면 pass한다.</li><li>'회원가입 성공' 메세지가 출력되면 pass한다.</li>                                                                                                                                                 | {email: example@example.com, password: 'password123' nickname: 'testuser'} |
| /auth/signup                   | 회원가입 실패-중복된 이메일                  | TC01-2       | <li>Status code is 409: api의 response의 status 코드가 409이면 pass한다.</li><li>'이미 존재하는 이메일입니다.' 메세지가 출력되면 pass한다.</li>                                                                                                                                   | {email: 'a1@gmail.com', password: 'dkssud!!', nickname: 'nick'}            |
| /auth/signup                   | 회원가입 실패-잘못된 이메일 형식             | TC01-3       | <li> Status code is 400: api의 response의 status 코드가 400이면 pass한다.</li><li>'잘못된 이메일 형식입니다.' 메세지가 출력되면 pass한다.</li>                                                                                                                                    | {email: 'test', password: 'dkssud!!', nickname: 'nick'}                    |
| /auth/signup                   | 회원가입 실패-너무 짧은 비밀번호             | TC01-4       | <li> Status code is 400: api의 response의 status 코드가 400이면 pass한다.</li><li>'비밀번호는 8자 이상이어야 합니다.' 메세지가 출력되면 pass한다.</li>                                                                                                                            | {email: 'example2@example.com', password: '!!', nickname: 'nick'};         |
| /auth/login                    | 로그인                                       | TC02-1       | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>response에 accessToken이 있으면 pass한다.</li>                                                                                                                                                  | {email: 'a1@gmail.com', password: 'dkssud!!'};                             |
| /auth/login                    | 로그인 실패-존재하지 않는 이메일             | TC02-2       | <li> Status code is 404: api의 response의 status 코드가 404 pass한다.</li><li>'존재하지 않는 이메일입니다.' 메세지가 출력되면 pass한다.</li>                                                                                                                                      | {email: 'a11@example.com', password: 'password1'};                         |
| /auth/login                    | 로그인 실패-잘못된 비밀번호                  | TC02-3       | <li>Status code is 400: api의 response의 status 코드가 400이면 pass한다.</li><li>'잘못된 비밀번호입니다.' 메세지가 출력되면 pass한다.</li>                                                                                                                                        | {email: 'a1@gmail.com', password: 'wrongpassword'};                        |
| /videos                        | 비디오 리스트 목록 조회                      | TC03-1       | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>response가 Array 객체면 pass한다.</li><li>response 배열의 길이가 0보다 크면 pass한다.</li><li>response에 video_id 필드가 있으면 pass한다.</li><li>response에 title 필드가 있으면 pass한다.</li> |
| /videos?title=title            | 비디오 리스트 목록 조회-검색 기능            | TC03-2       | <li>Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>response 배열의 길이가 1이면 pass한다.</li><li>response 배열 첫번째 객체의 title이 title이면 pass한다.</li>                                                                                      |
| /videos?category=category_name | 비디오 리스트 목록 조회-검색 기능            | TC03-3       | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>response가 Array 객체면 pass한다.</li><li>response 배열 첫번째 객체의 category가 category_name이면 pass한다.</li>                                                                               |
| /videos/:id                    | 비디오 상세정보 조회                         | TC04-1       | <li>Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>api의 response값에 video 객체의 모든 필드가 존재하면 pass한다.</li>                                                                                                                              |
| /videos/:id                    | 비디오 상세정보 조회-해당 비디오가 없는 경우 | TC04-2       | <li> Status code is 404: api의 response의 status 코드가 404이면 pass한다.</li><li>'Video not found' 메세지가 출력되면 pass한다.</li>                                                                                                                                              |
| /videos/:id/like               | 비디오 좋아요 요청                           | TC05-1       | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>'Liked' 메세지가 출력되면 pass한다.</li>                                                                                                                                                        |
| /videos/:id/like               | 비디오 좋아요 취소 요청                      | TC05-2       | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>'unLiked' 메세지가 출력되면 pass한다.</li>                                                                                                                                                      |
| /videos/:id/comments           | 댓글 작성 요청                               | TC06-1       | <li>Status code is 201: api의 response의 status 코드가 201이면 pass한다.</li><li>api의 response값이 Array 객체이면 pass한다.</li><li>api의 response값의 content 필드의 값이 요청한 content 필드의 값과 일치하면 pass한다. </li>                                                   | {content: 'Test Cmment 1', marked_time: '00:01:23'}                        |
| /videos/:id/comments/:id/like  | 댓글 좋아요 요청                             | TC07-1       | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>'Liked' 메세지가 출력되면 pass한다.</li>                                                                                                                                                        |
| /videos/:id/comments/:id/like  | 댓글 좋아요 취소 요청                        | TC07-2       | <li> Status code is 200: api의 response의 status 코드가 200이면 pass한다.</li><li>'unLiked' 메세지가 출력되면 pass한다.</li>                                                                                                                                                      |

## Frontend System Test Cases

Frontend의 사용자 interaction과 view는 use case를 기반으로한 system test를 한다.

### 4. 로그인

Test Case ID: TC14-1

| Test Step                                | Test Data                   | Expected Result                                              |
| ---------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| 로그인하지 않은 사용자가 홈페이지에 접속한다.            | http://localhost:8080 | 로그인 창이 화면에 출력된다.            |
| 사용자가 로그인한다. | http://localhost:8080　                          | 동영상 목록 화면으로 이동한다.     |
---

### 동영상
| Test Step                                | Test Data                   | Expected Result                                              |
| ---------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| 사용자가 동영상을 클릭한다.            | http://localhost:8080/                          | 동영상 및 댓글 화면이 출력된다. |

### 시스템 리소스
| Test Step                                | Test Data                   | Expected Result                                              |
| ---------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| 사용자가 시스템 리스소 화면에 접속한다.            | http://localhost:8080/                          | CPU, 메모리 사용량 그래프가 출력된다. |

---

# 테스트 결과

## 백엔드 유닛테스트
![image](https://github.com/user-attachments/assets/9cc6d0a3-3703-4d3e-b81c-dfb31cce170d)

![image](https://github.com/user-attachments/assets/6f1d3e24-1fb7-4402-baf5-ba110aeb077a)

## 프론트엔드 시스템테스트