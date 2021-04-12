# withcredential?

- withCredential이 뭐야?
- true주면 다른 포트끼리 쿠키 공유 가능
- cors 에러나서 true로 바꿨더니 이런 에러
  `Access to XMLHttpRequest at 'http://54.180.141.91:8080/api/user/signup/emailCheck' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.`
- 다시 false로 바꿨더니 해결됨 왜..?
