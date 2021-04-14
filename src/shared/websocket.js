// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// 쿠키
import { getCookie } from './cookie';

// 소켓 통신 객체
const sock = new SockJS("http://54.180.141.91:8080/chatting");
const ws = Stomp.over(sock);

// 받은 메시지를 저장하는 배열
const messages = [];

// connect 및 subscribe

const wsConnectSubscribe = () => {
  const token = getCookie('access-token');
  const roomId = localStorage.getItem('wschat.roomId');
  ws.connect({
    'token': token,
  }
    , () => {
      ws.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
        const newMessage = JSON.parse(data.body);
        messages.unshift(newMessage);
      }, { 'token': token });
    }
  )
};



export { ws, wsConnectSubscribe };