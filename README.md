# gaemangtalk_frontend

![logo](readme_images/logo.png)

๐[์ฌ์ดํธ ๋งํฌ](http://gaemangtalk.site/)

๐ฌ [์ ํ๋ธ ๋งํฌ](https://youtu.be/MDPGmLslJbg)

๐ [๋ฐฑ์๋ Repositroy ๋งํฌ](https://github.com/joychae/Springboot-Webproject-ChatService)

**gaemangtalk ํ๋ก์ ํธ์ ํ๋ก ํธ ์๋ Repositroy ์๋๋ค.**

## ๋ชฉ์ฐจ

[1. ๊ฐ์](#๊ฐ์)

[2. ํ๋ก์ ํธ ํน์ง](#ํ๋ก์ ํธ-ํน์ง)

[3. ๊ธฐ๋ฅ ์์ธ ์๊ฐ](#๊ธฐ๋ฅ-์์ธ-์๊ฐ)

[4. ์์ธํ์ด์ง](#์์ธํ์ด์ง)

[5. ์ฌ์ฉ ํจํค์ง](#์ฌ์ฉ-ํจํค์ง)

[6. Trouble shooting](#Trouble-shooting)

[7. ๊ฐ๋ฐ ํ์๋ผ์ธ](#๊ฐ๋ฐ-ํ์๋ผ์ธ)

[8. Contents](#Contents)

[9. License](#License)

[10. Reference](#Reference)

## ๊ฐ์

- ๋ช์นญ : gaemangtalk
- ๊ฐ๋ฐ ์ธ์ : 4๋ช
- ๊ฐ๋ฐ ๊ธฐ๊ฐ : 2021.04.16 ~ 2021.04.22
- ์ฃผ์ ๊ธฐ๋ฅ : ์์ ๋ก๊ทธ์ธ, ์ฑํ
- ๊ฐ๋ฐ ์ธ์ด : JavaScript
- ๊ฐ๋ฐ ๋ผ์ด๋ธ๋ฌ๋ฆฌ : React.js
- ํ์ ๊ด๋ฆฌ ํด : git
- ํ์ ํด : Slack,[notion](https://www.notion.so/9588991f3b544637a65490d3111a1592?v=f55c1d5304df47d79a184d20c23b3539)
- ๊ฐ๋จ ์๊ฐ : ๋ฆฌ์กํธ - ์คํ๋ง ํ์์ ์น์์ผ ๊ธฐ๋ฐ ์ฑํ ํ๋ก์ ํธ

## ํ๋ก์ ํธ ํน์ง

- ๊ฐ.๋ง.ํก!
  - ๊ฐ๋ฐ์ ์ง๋ง์์ ์ํ ํก
- ํ๋ก ํธ์๋์ ๋ฐฑ์๋๋ฅผ ๋ถ๋ฆฌํ์ฌ ํ๋ก์ ํธ ๊ฐ๋ฐ
  - ๊ฐ ํํธ๋ณ๋ก Repository๋ฅผ ์์ฑ ํ ์์
  - ํ๋ก ํธ: AWS S3
  - ๋ฐฑ์๋: AWS EC2
  - ๋น๋ ํ, S3์ EC2๋ฅผ ์ฐ๋
    - API ๋ช์ธ์์ ๋ฐ๋ผ APIํธ์ถ ๋ฐ ์๋ต ํ์ธ
- React, Spring์ ๊ธฐ๋ฐ์ผ๋กํ ์ฑํ ์น ์ ํ๋ฆฌ์ผ์ด์
- ๊ฐ๋ฐ ๊ณต๋ถ๋ฅผ ํ๋ฉด์ ๊ณ ๋ฏผ, ์ก๋ด์ ํ ์ ์๋ ์ฑํ ์๋น์ค
- ์ผ๋ฐ ํ์๊ฐ์ ๋ฐ ์์ ๋ก๊ทธ์ธ(์นด์นด์ค) ์ฐ๋
  - Validation
  - JWT, ์ฟ ํค ๋ฐฉ์
- ์นดํ๊ณ ๋ฆฌ(ํ๊ทธ), ์ฑํ๋ฐฉ ์ด๋ฏธ์ง ์ค์ ์ ํ์ฌ ๋ฐฉ ์์ฑ
- ์นดํ๊ณ ๋ฆฌ(ํ๊ทธ)๋ณ ์กฐํ๊ธฐ๋ฅ
- ํ์์ ๋ณดํญ์์ ์ฌ์ฉ์ ์ ๋ณด ์์ 
  - ๋๋ค์, ํ๋กํ ์ฌ์ง
- websocket ๊ธฐ๋ฐ์ ์ฑํ ๊ธฐ๋ฅ
  - sockjs-client, stompjs
- ์ฌ์ฉ์์ ๋ฉ์์ง์ ์๋๋ฐฉ์ ๋ฉ์์ง๋ฅผ ๊ตฌ๋ถํ๋ ui ์ ์ฉ
- ๋ฐ์ํ ๋์์ธ
  - ํ๋ธ๋ฆฟ, ์ค๋งํธํฐ

## ๊ธฐ๋ฅ ์์ธ ์๊ฐ

### 1. WebSocket

- HTTP๋ ์ค์๊ฐ ํต์ ์ด ๋ถ๊ฐ๋ฅ
- WebSocket์ ์ค์๊ฐ ํต์ ์ ๋ฌธ์ ๋ฅผ ํด๊ฒฐ
- ์ค์๊ฐ ์๋ฐฉํฅ ํต์ ์ ์ง์
- ํธ๋์์ดํฌ(HTTP) -> ์๋ฐฉํฅ ํต์ 

### 2. Stomp

- Simple Text Oriented Messaging Protocol
- ํ์คํธ ๊ธฐ๋ฐ์ ํ๋กํ ์ฝ
- `connect`, `subscribe`, `send`, `disconnect`, `usubscribe` ๋ฉ์๋
  - `connect` -> `subscribe` ์ดํ ๋ณ๋์ ์์ฒญ ์์ด ์๋ฒ๋ก๋ถํฐ ๋ฐ์ดํฐ๋ฅผ ๋ฐ์ ์ ์๋ ์ํ๊ฐ ๋๋ค.
  - ์ด ๋, `send`๋ฉ์๋๋ก ๋ฐ์ดํฐ๋ฅผ ์ ์กํ  ์ ์๋ค.
  - `send`๋ก ๋ฉ์์ง๋ฅผ ๋ณด๋ด๋ฉด `subscribe`์ํ์ด๋ฏ๋ก ์๋์ผ๋ก ์์ ์ ๋ฉ์์ง๋ ํ์๋๋ค.
  - ์ฐ๊ฒฐ์ ํด์ ํ  ๋, `disconnect`, `unsubscribe` ๋ฅผ ํ๋ค.

#### ์ ์ฉ ์ฝ๋

```JavaScript
// styled-components, import, export, retrun์ ์๋ต
// ์ฑํ ๋ฐฉ ์ปดํฌ๋ํธ
const ChattingRoom = (props) => {
 // ์์ผ ํต์  ๊ฐ์ฒด
 const sock = new SockJS('์๋ํฌ์ธํธ');
 const ws = Stomp.over(sock);

 // ๋ฐฉ ์ ๋ชฉ ๊ฐ์ ธ์ค๊ธฐ
 const { roomName, category } = useSelector((state) => state.chat.currentChat);
 const roomId = useSelector((state) => state.chat.currentChat.roomId);

 // ํ ํฐ
 const token = getCookie('access-token');
 const dispatch = useDispatch();

 // ๋ณด๋ผ ๋ฉ์์ง ํ์คํธ
 const messageText = useSelector((state) => state.chat.messageText);
 // sedner ์ ๋ณด ๊ฐ์ ธ์ค๊ธฐ
 let sender = useSelector((state) => state.user.userInfo?.username);
 if (!sender) {
   sender = getCookie('username');
 }

 // ๋ ๋๋ง ๋  ๋๋ง๋ค ์ฐ๊ฒฐ,๊ตฌ๋ ๋ค๋ฅธ ๋ฐฉ์ผ๋ก ์ฎ๊ธธ ๋ ์ฐ๊ฒฐ, ๊ตฌ๋ ํด์ 
 React.useEffect(() => {
   wsConnectSubscribe();
   return () => {
     wsDisConnectUnsubscribe();
   };
 }, [roomId]);

 // ์น์์ผ ์ฐ๊ฒฐ, ๊ตฌ๋
 function wsConnectSubscribe() {
   try {
     ws.connect(
       {
         token: token
       },
       () => {
         ws.subscribe(
           `/sub/api/chat/rooms/${roomId}`,
           (data) => {
             const newMessage = JSON.parse(data.body);
             dispatch(chatActions.getMessages(newMessage));
           },
           { token: token }
         );
       }
     );
   } catch (error) {
     console.log(error);
   }
 }

 // ์ฐ๊ฒฐํด์ , ๊ตฌ๋ํด์ 
 function wsDisConnectUnsubscribe() {
   try {
     ws.disconnect(
       () => {
         ws.unsubscribe('sub-0');
       },
       { token: token }
     );
   } catch (error) {
     console.log(error);
   }
 }

 // ์น์์ผ์ด ์ฐ๊ฒฐ๋  ๋ ๊น์ง ์คํํ๋ ํจ์
 function waitForConnection(ws, callback) {
   setTimeout(
     function () {
       // ์ฐ๊ฒฐ๋์์ ๋ ์ฝ๋ฐฑํจ์ ์คํ
       if (ws.ws.readyState === 1) {
         callback();
         // ์ฐ๊ฒฐ์ด ์ ๋์์ผ๋ฉด ์ฌํธ์ถ
       } else {
         waitForConnection(ws, callback);
       }
     },
     1 // ๋ฐ๋ฆฌ์ด ๊ฐ๊ฒฉ์ผ๋ก ์คํ
   );
 }

 // ๋ฉ์์ง ๋ณด๋ด๊ธฐ
 function sendMessage() {
   try {
     // token์ด ์์ผ๋ฉด ๋ก๊ทธ์ธ ํ์ด์ง๋ก ์ด๋
     if (!token) {
       alert('ํ ํฐ์ด ์์ต๋๋ค. ๋ค์ ๋ก๊ทธ์ธ ํด์ฃผ์ธ์.');
       history.replace('/');
     }
     // sendํ  ๋ฐ์ดํฐ
     const data = {
       type: 'TALK',
       roomId: roomId,
       sender: sender,
       message: messageText,
     };
     // ๋น๋ฌธ์์ด์ด๋ฉด ๋ฆฌํด
     if (messageText === '') {
       return;
     }
     // ๋ก๋ฉ ์ค
     dispatch(chatActions.isLoading());
     waitForConnection(ws, function () {
       ws.send(
         '/pub/api/chat/message',
         { token: token },
         JSON.stringify(data)
       );
       console.log(ws.ws.readyState);
       dispatch(chatActions.writeMessage(''));
     });
   } catch (error) {
     console.log(error);
     console.log(ws.ws.readyState);
   }
 }

```

## ์์ธํ์ด์ง

### ๋ก๊ทธ์ธ, ์นด์นด์ค ์์ ๋ก๊ทธ์ธ

![](https://images.velog.io/images/ouo_yoonk/post/18deb07e-2d11-4f5b-b3c1-1dd76a56860c/login.gif)

![](https://images.velog.io/images/ouo_yoonk/post/35bec210-96ca-46ec-9cd9-55f28089c38c/kakaologin.gif)

### ํ์๊ฐ์

![](https://images.velog.io/images/ouo_yoonk/post/29a60653-f09f-40b8-9f9d-a46cffaeb8ce/signup.gif)

- validation์ ๋ง์ผ์ปฌ๋ฆฌ ์คํ์ผ ์ ์ฉ

### ๋น๋ฐ๋ฒํธ ์ฐพ๊ธฐ ๊ธฐ๋ฅ

![](https://images.velog.io/images/ouo_yoonk/post/3d092346-02ce-45b4-aa20-f7b763132c62/findpassword.gif)

### ํ์์ ๋ณด ์์ 

![](https://images.velog.io/images/ouo_yoonk/post/0b56418b-26b3-411f-be4a-2c6aa9971b57/updateuserinfo.gif)

### ์ฑํ๋ฐฉ ์์ฑโจ

![](https://images.velog.io/images/ouo_yoonk/post/09f3428c-d069-4c7c-a012-08d401a52345/createChatroom.gif)

### ์ฑํโจ

![](https://images.velog.io/images/ouo_yoonk/post/9f0c751c-c7bf-46a0-9007-c8bd47593a4f/chatting.gif)

### ๋ฐ์ํ - ๋ชจ๋ฐ์ผ / ํ๋ธ๋ฆฟ

![](https://images.velog.io/images/ouo_yoonk/post/4325c47b-3b32-4270-b952-e4411392851b/res_chat.gif)

## ์ฌ์ฉ ํจํค์ง

- **class101/ui**
  - ๋ฆฌ์กํธ์ ์ฐ๋๋๋ ui ํจํค์ง
- **reduxjs/toolkit**
  - ๋ฐ์ดํฐ ์ ์ญ ๊ด๋ฆฌ๋ฅผ ์ํ ๋ฆฌ๋์ค ๊ด๋ฆฌ ํจํค์ง
- **socks-client**
  - ์น ์์ผ ํต์ ์ ๊ฐ๋ฅํ๊ฒ ํ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ
- **stompjs**
  - ๋ฉ์์ง ํ๋กํ ์ฝ
- **styled-components**
  - ์ปดํฌ๋ํธ์ ์คํ์ผ์ ์ค์ ํ๋ ํจํค์ง
- **axios**
  - ์๋ฒ ํต์ ์ ์ํ ํจํค์ง
- **connected-react-router, history**
  - ๋ผ์ฐํ ๋ฐ ํ์ด์ง ์ด๋์ ์ํ ํจํค์ง

## Trouble shooting

**ํ๋ก์ ํธ๋ฅผ ํ๋ฉฐ ๋ง์ฃผ์น ๋ฌธ์ ๋ค๊ณผ ํด๊ฒฐํ ๋ฐฉ๋ฒ์ ์ ๋ฆฌ**

### 1. withcredential?

- withCredential์ ์ต์์ด true๋ฉด ๋ค๋ฅธ ํฌํธ๋ผ๋ฆฌ ์ฟ ํค ๊ณต์ ๊ฐ ๊ฐ๋ฅํ๋ค
- ๊ธฐ๋ณธ๊ฐ์ false
- ์ด์  ํ๋ก์ ํธ์์ withCredential=true๋ก ํ์ง์์ผ๋ฉด cors์๋ฌ๊ฐ ๋์ ์ต์์ ๋ฏธ๋ฆฌ ๋ฐ๊พธ๊ณ  api ์์ฒญ์ ํ๋๋ฐ, ์๋์ ๊ฐ์ ์๋ฌ๊ฐ ๋ฌ๋ค
  `Access to XMLHttpRequest at 'http://54.180.141.91:8080/api/user/signup/emailCheck' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.`
- response header์ 'Access-Control-Allow-Origin'๊ฐ \*๋ฉด withCredential์ด true๋ฉด ์๋๋ ์๋ฏธ.
- ์ง๊ธ ์๋ฒ์ค์ ์์๋ withCredential์ ๋ค์ false๋ก ๋ฐ๊พธ๋ ์์ฒญ์ด ์ ๋ค์ด๊ฐ๋ค

### 2. ๋ก๊ทธ์ธ ์ ์งํ  ๋ ์ด๋ป๊ฒ ํ์ง?

- ์๋ก๊ณ ์นจํ๋ฉด ์คํ ์ด์ ์ ์ฅํ user ์ ๋ณด๊ฐ ์ฌ๋ผ์ ธ์, ๋ก๊ทธ์ธ ์ํ๋ฅผ ์ ์งํ  ๋ฐฉ๋ฒ์ด ํ์ํ๋ค.
- ๋ก๊ทธ์ธํ  ๋ ํ์ํ ์ฌ์ฉ์ ์ ๋ณด๋ฅผ ์ฟ ํค๋ ์ธ์ ์คํ ๋ฆฌ์ง์ ์ ์ฅํ ์ง, ํ ํฐ๋ง ์ ์ฅํด ํ ํฐ์ผ๋ก user ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ฌ์ง ๊ณ ๋ฏผํ์
- ์ฌ์ฉ์ ์ ๋ณด๋ฅผ ์คํ ๋ฆฌ์ง์ ์ ์ฅํ๋ฉด, ์๋ฐ์ดํธ๋ฅผ ํ  ๋๋ ๋งค๋ฒ ๋ฐ์์ ํด์ผํด์, token ๊ฐ๋ง ์ ์ฅํด ์๋ก๊ณ ์นจํ  ๋๋ง๋ค user ์ ๋ณด๋ฅผ ์ค๋ ๋ฐฉ๋ฒ์ผ๋ก ๊ตฌํํ๋ค.
- ์ฟ ํค๋ ์์ฒญ์ด ๊ฐ ๋๋ง๋ค ๊ฐ์ด ์ ์ก์ด ๋๋ฏ๋ก, ๋ธ๋ผ์ฐ์ ๋ฅผ ๋๋ฉด ์ ๋ณด๊ฐ ์ฌ๋ผ์ง๋ session์ ํ ํฐ์ ์ ์ฅํ๋ ๋ฐฉ๋ฒ์ด ์ข์ ๊ฒ ๊ฐ๋ค

### 3. ์ฑํ์ด ๋๊ธฐ๋ ๋ฌธ์ 

![websocket_error](readme_images/websocket_error.png)

- Connect -> Subscribe ํ send ๋ฉ์๋๋ก ๋ฉ์์ง๋ฅผ ๋ณด๋ผ ๋ ๋ฐ์
- ์ ์ ์์ฒด๊ฐ ๋์ด์์์๋ ๋ถ๊ตฌํ๊ณ  ๊ฐํ์ ์ผ๋ก ๋ฐ์

#### ์์ธ

- ์น์์ผ ๊ฐ์ฒด์ readyState๋ผ๋ ํ๋กํผํฐ์ ์ํ
- send ๋ฉ์๋๋ฅผ ๋ณด๋ผ ๋, readyState๊ฐ 0์ด๋ฉด ์์ ์ค๋ฅ๊ฐ ๋ฐ์ํ๋ ๊ฒ์ด์์

| Value | State      | Description                                |
| ----- | ---------- | ------------------------------------------ |
| 0     | CONNECTING | ์์ผ์ด ์์ฑ, ์ฐ๊ฒฐ์ด ์์ง ๋์ง ์์         |
| 1     | OPEN       | ์ฐ๊ฒฐ์ด ์ด๋ ค ์๊ณ  , ํต์ ํ  ์ค๋น๊ฐ ๋์ด ์์ |

#### ํด๊ฒฐ

- setTimeout ํจ์๋ก readyState๊ฐ 1์ด ๋  ๋ send ๋ฉ์๋๋ฅผ ์คํํ  ์ ์๋๋ก ํจ

```JavaScript
  // ์น์์ผ์ด ์ฐ๊ฒฐ๋  ๋ ๊น์ง ์คํํ๋ ํจ์
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // ์ฐ๊ฒฐ๋์์ ๋ ์ฝ๋ฐฑํจ์ ์คํ
        if (ws.ws.readyState === 1) {
          callback();
          // ์ฐ๊ฒฐ์ด ์ ๋์์ผ๋ฉด ์ฌํธ์ถ
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // ๋ฐ๋ฆฌ์ด ๊ฐ๊ฒฉ์ผ๋ก ์คํ
    );
  }
```

<hr/>

**reference**

- https://developer.mozilla.org/ko/docs/Web/API/WebSocket/readyState

## ๊ฐ๋ฐ ํ์๋ผ์ธ

| ์ผ์       | ์งํ ๋ชฉ๋ก                                                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2021.04.09 | ์ฃผ์  ์ ์ <br />์์ด์ดํ๋ ์<br />API ์ค๊ณ<br />์ค๊ฐ ์ ๊ฒ ๋ชฉํ ์ค์                                                                                                                                              |
| 2021.04.10 | Repository ์์ฑ<br />๋ทฐ ๋ง๋ค๊ธฐ ๊ณํ<br />ํจํค์ง ๊ธฐ๋ณธ ์ธํ ๊ณํ<br />๋ก๊ณ  ์ ์<br />ํ๋ง ์์ ์ค์ <br />์์ํ ์ค์ <br />ํ์๊ฐ์, ๋ก๊ทธ์ธ ์์คํ ๊ณํ                                                           |
| 2021.04.12 | ํ์๊ฐ์, ๋ก๊ทธ์ธ, ๋ ์ด์์, ์ต์๋จ์ ์ปดํฌ๋ํธ, ์ฑํ ๋ทฐ<br />ํจํค์ง ์ธํ<br />๋๋ ํ ๋ฆฌ ์ธํ<br />css reset<br />component theme ์ธํ<br />useInput Hook ์ธํ<br />ํ์๊ฐ์ api<br />ํ์๊ฐ์, ๋ก๊ทธ์ธ Validation |
| 2021.04.13 | ํ์์ฐฝ ๊ตฌํ<br />์ฑํ๋ฐฉ ์์ฑ, ์กฐํ api<br />์ฑํ ๊ด๋ จ ๋ฆฌ๋์ค ๋ชจ๋ ์์ฑ<br />Header ์์ด์ฝ<br />faviconi ๋ฐ ๋ฉํํ๊ทธ ์ค์ <br />ํ์๊ฐ์ ํ์ด์ง ์๋ฃ<br />๋ฉ์์ง ์์ฑ input<br />์น์์ผ ํ ํฐ ๋ณด๋ด๊ธฐ ํ์ธ         |
| 2021.04.14 | ์น์์ผ ์๋ฒ์ ์ฐ๋<br />๋น๋ฐ๋ฒํธ ์ฐพ๊ธฐ ์ปดํฌ๋ํธ ์์ฑ<br />๋น๋ฐ๋ฒํธ ์ฐพ๊ธฐ api<br />๋ก๊ทธ์ธ ์ ์ง ๊ธฐ๋ฅ                                                                                                               |
| 2021.04.15 | ๋ฉ์์ง ํ๋ฉด ๊ตฌํ<br />์์ ๋ก๊ทธ์ธ(์นด์นด์ค ๋ก๊ทธ์ธ) <br />disconnect, unsubscribe ์ถ๊ฐ                                                                                                                            |
| 2021.04.16 | DB์์ ๋ฉ์์ง ๊ฐ์ ธ์ค๊ธฐ(api)<br />์ํฐํค ์๋ ฅ ๊ธฐ๋ฅ, ๋ฉ์์ง ์๊ฐ ํ์<br />์ฑํ๋ฐฉ ์๋ ์คํฌ๋กค<br />์์ ๋ก๊ทธ์ธ(์นด์นด์ค ๋ก๊ทธ์ธ) ๊ตฌํ ์๋ฃ<br />๋ฉ์์ง ์นด์นด์คํก ๋ก๊ทธ์ธ ์ฌ์ฉ์์ ์ฐ๋<br />axios ๋ชจ๋ํ              |
| 2021.04.17 | ์นด์นด์ค ๋ก๊ทธ์ธ ๊ด๋ จ ๋ฆฌ๋์ค ์ค์ <br />์ฑํ๋ฐฉ ์ ํ ํจ๊ณผ ์ถ๊ฐ<br />๋ฉ์์ง ์ปดํฌ๋ํธ ์คํ์ผ ์กฐ์                                                                                                                      |
| 2021.04.18 | ํ๋กํ ์ด๋ฏธ์ง๋ฅผ ์ ์ฉํ๊ธฐ ์ํ ์คํ์ผ ์ด์ ์ ์ฉ<br />ํค๋ menu๋ฅผ ๊ด๋ฆฌํ๊ธฐ ์ํ ๋ฆฌ๋์ค ์์ฑ<br />ํค๋ ๋ก๊ทธ์ธ/๋น๋ก๊ทธ์ธ ํ์ฑํ ๊ธฐ๋ฅ<br />์๋ก๋ ์ปดํฌ๋ํธ ์์ฑ                                                      |
| 2021.04.19 | ๊ธฐ๋ณธ ํ๋กํ ์ด๋ฏธ์ง ์ค์ <br />์น์์ผ readyState ๋ฌธ์  ํด๊ฒฐ<br />Message.js ์คํ์ผ ์ค์ <br />์๋ฒ ip ๋ณ๊ฒฝ<br />์ ์  ํ๋กํ ํ์ด์ง ์คํ์ผ๋ง                                                                        |
| 2021.04.20 | ์๋ก๋ api ์ถ๊ฐ<br />์ฑํ๋ฐฉ ๋ฆฌ์คํธ ์ฌ์ง ์ ์ฉ, ๋ทฐ ์ ์ฉ<br />๋ฐ์ํ ๋์์ธ ์ ์ฉ<br />๊ฐ๋ก๋ชจ๋ ๊ฐ์ง<br />์นดํ๊ณ ๋ฆฌ(ํ๊ทธ) ์ค์  ๊ธฐ๋ฅ, api<br />์นดํ๊ณ ๋ฆฌ(ํ๊ทธ) ๋ณ ์กฐํ ๊ธฐ๋ฅ, api                                      |
| 2021.04.21 | ๋ทฐ ์กฐ์  ๋ฐ ์ฌ์ฉ์ฑ ๊ฐ์ <br />๋ก๊ทธ์ธ ๊ธฐ๋ฅ ์์ <br />์ฌ์ฉ์ฑ ํ์คํธ ๋ฐ ๋ฒ๊ทธ ๊ฐ์ <br />README.md ์์ฑ                                                                                                               |

## Contetnts

### ๋ฐ์ํ ๋์์ธ(์ค๋งํธํฐ)

![content1](readme_images/content1.png)

![content2](readme_images/content2.png)

### ๋ฐ์ํ ๋์์ธ (ํ๋ธ๋ฆฟ)

![content3](readme_images/content3.png)

![content4](readme_images/content4.png)

## License

### MIT

## Reference

- ๋ก๊ณ ์ ์
  - [๋ฏธ๋ฆฌ ์บ๋ฒ์ค](https://www.miricanvas.com)