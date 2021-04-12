import React from 'react';

import styled from 'styled-components';

// Components
import ChatList from '../components/ChatList';
import MessageList from '../components/MesseageList';
import MessageWrite from '../components/MessageWrite';

// Elements
import ChatName from '../elements/ChatName';

// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

// 리덕스
import { useDispatch, useSelector } from 'react-redux';


// 채팅 페이지 컴포넌트
const Chat = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log('s')
    dispatch(chatActions.getChatList());
  }, [])

  return (
    <Container>
      <ChatList />
      <ChatWrap>
        <ChatName />
        <MessageList />
        <MessageWrite />

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

export default Chat;