# gaemangtalk_frontend

[사이트 링크](http://gaemangtalk.site/)

**gaemangtalk 프로젝트의 프론트 엔드 Repositroy 입니다.**



## 프로젝트 특징

* React, Spring을 기반으로한 채팅 웹 애플리케이션

# withcredential?

- withCredential은 옵션이 true면 다른 포트끼리 쿠키 공유가 가능하다
- 기본값은 false
- 이전 프로젝트에서 withCredential=true로 하지않으면 cors에러가 나서 옵션을 미리 바꾸고 api 요청을 했는데, 아래와 같은 에러가 났다
  `Access to XMLHttpRequest at 'http://54.180.141.91:8080/api/user/signup/emailCheck' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.`
- response header의 'Access-Control-Allow-Origin'가 \*면 withCredential이 true면 안되는 의미.
- 지금 서버설정에서는 withCredential을 다시 false로 바꾸니 요청이 잘 들어갔다

# 로그인 유지할 때 어떻게 하지?

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
