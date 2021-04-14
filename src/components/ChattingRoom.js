import React from 'react';

import styled from 'styled-components';

// Components
import MessageList from './MesseageList';
import MessageWrite from './MessageWrite';
import ChatList from './ChatList';

// elements
import { ChatName } from '../elements'

// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

// 쿠키
import { getCookie } from '../shared/cookie';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// 채팅 방 컴포넌트
const ChattingRoom = (props) => {

  // 소켓 통신 객체
  const sock = new SockJS("http://54.180.141.91:8080/chatting");
  const ws = Stomp.over(sock);

  // 방 제목 가져오기
  const roomName = useSelector((state) => state.chat.currentChat.roomName);
  const roomId = useSelector((state) => state.chat.currentChat.roomId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // roomId가 없으면 실행하지 않기
    if (roomId === null) {
      return
    }

    const token = getCookie('access-token');
    let sock = new SockJS("http://54.180.141.91:8080/chatting");
    let ws = Stomp.over(sock);
    const messages = [];
    ws.connect({
      'token': token,
    }
      , () => {
        ws.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
          const newMessage = JSON.parse(data.body);
          dispatch(chatActions.getMessages(newMessage));
        }, { 'token': token });
      }
    );


  }, [roomId])

  // 구독 해제
  const roomUnsubscribe = (roomId) => {
    ws.unsubscribe(`/sub/api/chat/rooms/${roomId}`);
  }

  const messageText = useSelector((state) => state.chat.messageText)
  const sendMessage = () => {
    const token = getCookie('access-token');
    const sender = getCookie('username');
    // 보낼 데이터
    // const messageData = {
    //   'type': 'TALK',
    //   'roomId': roomId,
    //   'sender': sender,
    //   'message': messageText,
    //   'senderEmail': null,
    // }
    ws.send('/pub/api/chat/message', { 'token': token },
      JSON.stringify({
        'type': 'TALK',
        'roomId': roomId,
        'sender': sender,
        'message': messageText,
        'senderEmail': null,
      })
    )
  }


  return (
    <Container>
      <ChatList />
      <ChatWrap>
        <ChatName
          roomName={roomName}
        />
        <MessageList
          prevRoomId={roomId}
          roomUnsubscribe={roomUnsubscribe}
        />
        <MessageWrite
          sendMessage={sendMessage}
        />
      </ChatWrap>
    </Container>
  )
}




const Container = styled.div`
${(props) => props.theme.border_box};
${(props) => props.theme.flex_row}
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main_color_blur};
  color: ${(props) => props.theme.theme_yellow};
`;

const ChatWrap = styled.div`
${(props) => props.theme.flex_column}
width: 80%;
height: 100%;
`
export default ChattingRoom;