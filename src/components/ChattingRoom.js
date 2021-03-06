import React from 'react';

import styled from 'styled-components';

// Components
import MessageList from './MessageList';
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
import { history } from '../redux/configureStore';

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// components
import NoRoom from './NoRoom';

// 채팅 방 컴포넌트
const ChattingRoom = (props) => {
  // 소켓 통신 객체
  const sock = new SockJS('http://15.164.97.250:8080/chatting');
  const ws = Stomp.over(sock);

  // 방 제목 가져오기
  const { roomName, category } = useSelector((state) => state.chat.currentChat);
  const roomId = useSelector((state) => state.chat.currentChat.roomId);

  // 토큰
  const token = getCookie('access-token');
  const dispatch = useDispatch();

  // 보낼 메시지 텍스트
  const messageText = useSelector((state) => state.chat.messageText);
  // sedner 정보 가져오기
  let sender = useSelector((state) => state.user.userInfo?.username);
  if (!sender) {
    sender = getCookie('username');
  }

  // 렌더링 될 때마다 연결,구독 다른 방으로 옮길 때 연결, 구독 해제
  React.useEffect(() => {
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [roomId]);

  // 웹소켓 연결, 구독
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

  // 연결해제, 구독해제
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

  // 웹소켓이 연결될 때 까지 실행하는 함수
  function waitForConnection(ws, callback) {
    setTimeout(
      function () {
        // 연결되었을 때 콜백함수 실행
        if (ws.ws.readyState === 1) {
          callback();
          // 연결이 안 되었으면 재호출
        } else {
          waitForConnection(ws, callback);
        }
      },
      1 // 밀리초 간격으로 실행
    );
  }

  // 메시지 보내기
  function sendMessage() {
    try {
      // token이 없으면 로그인 페이지로 이동
      if (!token) {
        alert('토큰이 없습니다. 다시 로그인 해주세요.');
        history.replace('/');
      }
      // send할 데이터
      const data = {
        type: 'TALK',
        roomId: roomId,
        sender: sender,
        message: messageText,
      };
      // 빈문자열이면 리턴
      if (messageText === '') {
        return;
      }
      // 로딩 중
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

  return (
    <Container>
      <ChatList prevRoomId={roomId} />
      {!roomId && <NoRoom />}
      {roomId && (
        <ChatWrap>
          <ChatName roomName={roomName} category={category} />
          <MessageList />
          <MessageWrite sendMessage={sendMessage} />
        </ChatWrap>
      )}
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

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const ChatWrap = styled.div`
  ${(props) => props.theme.flex_column}
  width: 70%;
  height: 100%;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 85%;
  }
`;

export default ChattingRoom;
