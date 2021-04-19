# withcredential?

- withCredential이 뭐야?
- true주면 다른 포트끼리 쿠키 공유 가능
- cors 에러나서 true로 바꿨더니 이런 에러
  `Access to XMLHttpRequest at 'http://54.180.141.91:8080/api/user/signup/emailCheck' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.`
- 다시 false로 바꿨더니 해결됨 왜..?

# 사용하는 변수를 꼭 useState로 선언해야할까?

- 동적으로 바뀔 때 렌더링을 해야하면 useState를 해야함!!!!

# 로그인 유지할 때 어떻게 하지?

- 문제? 새로고침하면 스토어에 저장한 user 정보가 사라짐
- 해결? 로그인할 때 cookie에 정보를 저장해, 쿠키에 저장된 정보가 있으면 다시 값을 리덕스에 셋팅
- 고민? token 값만 저장해 새로고침할 때마다 user 정보를 가져오는 api를 호출할 것인가, user 정보 전체를 cookie에 저장할 것인가?
- 일단 전자의 방법으로 구현해둠

## 개발 타임라인

| 일자       | 진행 목록                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 2021.04.09 | 주제 선정<br />와이어프레임<br />API 설계<br />중간 점검 목표 설정                                                              |
| 2021.04.10 | 뷰 만들기 계획<br />패키지 기본 세팅 계획<br />로고 제작<br />테마 색상 설정<br />색상표 설정<br />회원가입, 로그인 시스템 계획 |
| 2021.04.12 | 회원가입, 로그인, 레이아웃, 최소단위 컴포넌트, 채팅 뷰<br />패키지 세팅<br />디렉토리 세팅<br />css reset                       |
