import React from 'react';

import styled from 'styled-components';

// Components
import MessageList from './MesseageList';
import MessageWrite from './MessageWrite';
import ChatList from './ChatList';

// elements
import { ChatName } from '../elements';

// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

// 쿠키
import { getCookie } from '../shared/cookie';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// components
import NoRoom from './NoRoom';

// 채팅 방 컴포넌트
const ChattingRoom = (props) => {
  // 소켓 통신 객체
  const sock = new SockJS('http://54.180.141.91:8080/chatting');
  const ws = Stomp.over(sock);

  // 웹소켓 연결, 구독
  async function wsConnectSubscribe() {
    try {
      const token = getCookie('access-token');
      await ws.connect(
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
      console.log(error)
    }
  }

  async function wsDisConnectUnsubscribe() {
    try {
      const token = getCookie('access-token');
      await ws.disconnect(
        () => {
          ws.unsubscribe('sub-0');
        },
        { token: token }
      );
    } catch (error) {
      console.log(error)
    }
  }

  // 방 제목 가져오기
  const roomName = useSelector((state) => state.chat.currentChat.roomName);
  const roomId = useSelector((state) => state.chat.currentChat.roomId);
  // 로딩 상테 가져오기
  const loading = useSelector((state) => state.chat.loading);
  const dispatch = useDispatch();

  React.useEffect(() => {

    wsConnectSubscribe();
    return () => {

      wsDisConnectUnsubscribe();
    };
  }, [roomId]);

  const messageText = useSelector((state) => state.chat.messageText);
  let sender = useSelector((state) => state.user.userInfo?.username);
  if (!sender) {
    sender = getCookie('username');
  }
  async function sendMessage() {
    try {
      // 빈문자열이면 리턴
      if (messageText === '') {
        return;
      }
      // 로딩 중
      dispatch(chatActions.isLoading());
      // 토큰과 유저이름 접근
      const token = getCookie('access-token');
      // 웹소켓 send 메소드
      // 연결 전일 때
      if (ws.ws.readyState === 0) {
        dispatch(chatActions.isLoaded());
        window.alert('도배는 자제해주세요. 😵')
        return
      }
      await ws.send(
        '/pub/api/chat/message',
        { token: token },
        JSON.stringify({
          type: 'TALK',
          roomId: roomId,
          sender: sender,
          message: messageText,
          senderEmail: null,
        })
      );
      console.log(ws.ws.readyState);
      dispatch(chatActions.writeMessage(''));
    } catch (error) {
      console.log(error)
      console.log(ws.ws.readyState);

    }
  }


  return (
    <Container>
      <ChatList prevRoomId={roomId} />
      <ChatWrap>
        <ChatName roomName={roomName} />
        {!roomId && <NoRoom />}
        {roomId && (
          <React.Fragment>
            <MessageList />
            <MessageWrite sendMessage={sendMessage} />
          </React.Fragment>
        )}
      </ChatWrap>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row}
  width: 100%;
  height: 100%;
  background-color: white;
  color: ${(props) => props.theme.theme_yellow};
`;

const ChatWrap = styled.div`
  ${(props) => props.theme.flex_column}
  width: 80%;
  height: 100%;
`;
export default ChattingRoom;