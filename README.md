# gaemangtalk_frontend

[사이트 링크](http://gaemangtalk.site/)

**gaemangtalk 프로젝트의 프론트 엔드 Repositroy 입니다.**



## 프로젝트 특징

* 개.망.톡!
  * 개발자 지망생을 위한 톡
* 프론트엔드와 백엔드를 분리하여 프로젝트 개발
  *  각 파트별로 Repository를 생성 후 작업
  * 프론트: AWS S3
  * 백엔드: AWS EC2
  * 빌드 후, S3와 EC2를 연동
    * API 명세서에 따라 API호출 및 응답 확인
* React, Spring을 기반으로한 채팅 웹 애플리케이션
* 개발 공부를 하면서 고민, 잡담을 할수 있는 채팅 서비스
* 일반 회원가입 및 소셜 로그인(카카오) 연동
  * Validation
  * JWT, 쿠키 방식
* 카테고리(태그), 채팅방 이미지 설정을 하여 방 생성
* 카테고리(태그)별 조회기능
* 회원정보탭에서 사용자 정보 수정
  * 닉네임, 프로필 사진
* websocket 기반의 채팅 기능
  * sockjs-client, stompjs
* 사용자의 메시지와 상대방의 메시지를 구분하는 ui 적용



## 개요

* 명칭 : gaemangtalk
* 개발 인원 : 4명
* 기발 기간 : 2021.04.16 ~ 2021.04.22
* 주요 기능 : 소셜 로그인, 채팅
* 개발 언어 : JavaScript
* 개발 라이브러리 : React.js
* 형상 관리 툴 : git
* 협업 툴 : Slack
* 간단 소개 : 리액트 - 스프링 협업의 웹소켓 기반 채팅 프로젝트



## 사용 패키지

* class101/ui
  * 리액트와 연동되는 ui 패키지
* reduxjs/toolkit
  * 데이터 전역 관리를 위한 리덕스 관리 패키지
* socks-client
  * 웹 소켓 통신을 가능하게 하는 라이브러리
* stompjs
  * 메시지 프로토콜
* styled-components
  * 컴포넌트의 스타일을 설정하는 패키지
* axios
  * 서버 통신을 위한 패키지
* connected-react-router, history
  - 라우팅 및 페이지 이동을 위한 패키지



## Trouble shooting

**프로젝트를 하며 발생한 문제들과 해결한 방법을 정리**

### withcredential?

- withCredential은 옵션이 true면 다른 포트끼리 쿠키 공유가 가능하다
- 기본값은 false
- 이전 프로젝트에서 withCredential=true로 하지않으면 cors에러가 나서 옵션을 미리 바꾸고 api 요청을 했는데, 아래와 같은 에러가 났다
  `Access to XMLHttpRequest at 'http://54.180.141.91:8080/api/user/signup/emailCheck' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.`
- response header의 'Access-Control-Allow-Origin'가 \*면 withCredential이 true면 안되는 의미.
- 지금 서버설정에서는 withCredential을 다시 false로 바꾸니 요청이 잘 들어갔다

### 로그인 유지할 때 어떻게 하지?

- 새로고침하면 스토어에 저장한 user 정보가 사라져서, 로그인 상태를 유지할 방법이 필요하다.
- 로그인할 때 필요한 사용자 정보를 쿠키나 세션 스토리지에 저장할지, 토큰만 저장해 토큰으로 user 정보를 가져올지 고민했음
- 사용자 정보를 스토리지에 저장하면, 업데이트를 할 때도 매번 반영을 해야해서, token 값만 저장해 새로고침할 때마다 user 정보를 오는 방법으로 구현했다.
- 쿠키는 요청이 갈 때마다 같이 전송이 되므로, 브라우저를 끄면 정보가 사라지는 session에 토큰을 저장하는 방법이 좋을 것 같다

---

**reference**

- https://ssungkang.tistory.com/entry/React-axios-%EC%9D%98-withCredentials

## 개발 타임라인

| 일자       | 진행 목록                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 2021.04.09 | 주제 선정<br />와이어프레임<br />API 설계<br />중간 점검 목표 설정                                                              |
| 2021.04.10 | 뷰 만들기 계획<br />패키지 기본 세팅 계획<br />로고 제작<br />테마 색상 설정<br />색상표 설정<br />회원가입, 로그인 시스템 계획 |
| 2021.04.12 | 회원가입, 로그인, 레이아웃, 최소단위 컴포넌트, 채팅 뷰<br />패키지 세팅<br />디렉토리 세팅<br />css reset                       |
