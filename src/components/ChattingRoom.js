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
    console.log(roomId)
    if (roomId === null) {
      return
    }
    const token = getCookie('access-token');
    // DB에 채팅 목록 가져오기

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

    return () => {
      const token = getCookie('access-token');
      ws.disconnect(() => {
        ws.unsubscribe('sub-0');
      }, { 'token': token })
    }
  }, [roomId])

  // 연결 해제
  const roomDisconnect = () => {
    // const token = getCookie('access-token');
    // ws.disconnect(() => {
    //   ws.unsubscribe('sub-0');
    // }, { 'token': token })
  }

  const messageText = useSelector((state) => state.chat.messageText)
  const sendMessage = () => {
    const token = getCookie('access-token');
    const sender = getCookie('username');
    // 빈문자열이면 리턴
    if (messageText === '') {
      return
    }
    // 로딩 중
    dispatch(chatActions.isLoading());
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
    dispatch(chatActions.writeMessage(''));

  }


  return (
    <Container>
      <ChatList
        roomDisconnect={roomDisconnect}
        prevRoomId={roomId}
      />
      <ChatWrap>
        <ChatName
          roomName={roomName}
        />
        <MessageList
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
  background-color: white;
  color: ${(props) => props.theme.theme_yellow};
`;

const ChatWrap = styled.div`
${(props) => props.theme.flex_column}
width: 80%;
height: 100%;
`
export default ChattingRoom;