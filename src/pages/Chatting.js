import React from 'react';

import styled from 'styled-components';

// Components
import ChatList from '../components/ChatList';

import ChattingRoom from '../components/ChattingRoom'


// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

// 쿠키
// import { getCookie } from '../shared/cookie';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';

// 소켓 통신
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';

// 채팅 페이지 컴포넌트
const Chatting = (props) => {
  // 로컬 스토리지로부터 채팅방 정보 가져오기
  // const roomId = localStorage.getItem('wschat.roomId');
  // const roomName = localStorage.getItem('wschat.roomName');
  // const token = getCookie('access-token');
  // let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb29pZTM1QGdtYWlsLmNvbSIsImlhdCI6MTYxODMxODc2NCwiZXhwIjoxNjE4MzIwNTY0fQ.dAk_u4_SbP0PrR5fpJarL6UDYKLbU9gN0NVW2wp-AGA';
  // 웹소켓, 스톰프 초기화
  // http://54.180.141.91:8080
  // let sock = new SockJS("http://54.180.141.91:8080/chatting");
  // let ws = Stomp.over(sock);
  // ws.connect({ 'token': token }), function (frame) {
  //   ws.subscribe(`/sub/api/chat/rooms/${roomId}`, function (message) {
  //     let receive = JSON.parse(message);
  //     console.log(message)
  //   });
  // }
  // 웹 소켓 연결
  // React.useEffect(() => {
  // ws.connect({
  //   'token': token,
  //   'Access-Control-Allow-Origin': '*://*',
  //   'Access-Control-Allow-Methods': '*',
  // }
  //   , () => {
  //     ws.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
  //       const newMessage = JSON.parse(data.body);
  //       console.log(newMessage)
  //     });
  //   }
  // );
  // }, []);


  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(chatActions.getChatList());
  }, [])




  return (
    <Container>
      <ChatList />
      <ChatWrap>
        <ChattingRoom />
      </ChatWrap>
    </Container>

  )
}

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  width: 100%;
  height: 100%;
  ${(props) => props.theme.border_box};
`;

// ChatName, MessageList 감싸는 요소
const ChatWrap = styled.div`
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  ${(props) => props.theme.border_box};
  width: 80%;
  height: 100%;
  position: relative;
`

export default Chatting;