// 웹소켓 통신
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// 쿠키
import { getCookie } from '../../shared/cookie';

const token = getCookie('access-token');
// client 객체
const client = new Client({
  brokerURL: 'ws://54.180.141.91:8080/chatting',
  connectHeaders: {
    token: token,
  },
  debug: function (str) {
    console.log(str);
  },
  // 자동 재연결
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
})

// 연결되었을 때 실행할 함수
// client.onConnect = function (frame) {

// };

// 에러처리 담당 함수
// client.onStompError = function (frame) {
//   console.log(frame.headers['message']);
//   console.log(frame.body);
// }

// 클라이언트 활성화
// client.activate();

// 메시지 보내기
// client.publish({
//   destination: '/pub/api/chat/message',
//   body: {
//     'type': 'TALK',
//     'roomId': roomId,
//     'sender': sender,
//     'message': '테스트',
//     'senderEmail': null,
//   },
//   headers: {
//     'token': token
//   }
// })


export default client