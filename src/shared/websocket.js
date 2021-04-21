// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// 리덕스
import { useDispatch } from 'react-redux';

// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

// 소켓 통신 객체
const sock = new SockJS('http://15.164.97.250:8080/chatting');
const ws = Stomp.over(sock);

// const dispatch = useDispatch()


export const WS = {

  connectAndSubscribe: function (token, roomId) {
    return ws.connect(
      {
        token, token
      },
      () => {
        ws.subscribe(
          `/sub/api/chat/rooms/${roomId}`,
          (data) => {
            const newMessage = JSON.parse(data.body);
            console.log('연결')
            // this.dispatch(chatActions.getMessages(newMessage));
          },
          { token: token }
        );
      }
    )
  },
  disconnectUnsubscribe: function (token) {
    return ws.disconnect(
      () => {
        ws.unsubscribe('sub-0');
      },
      { token: token }
    );
  }
}