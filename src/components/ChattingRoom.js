import React from 'react';

import styled from 'styled-components';

// Components
import MessageList from './MesseageList';
import MessageWrite from './MessageWrite';

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

    return
  }, [roomId])

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
    <React.Fragment>
      <ChatName
        roomName={roomName}
      />
      <MessageList />
      <MessageWrite
        sendMessage={sendMessage}
      />
    </React.Fragment>
  )
}




const Container = styled.div`
${(props) => props.theme.border_box};
  width: 100%;
  height: 10%;
  background-color: ${(props) => props.theme.main_color_blur};
  color: ${(props) => props.theme.theme_yellow};
`;

export default ChattingRoom;