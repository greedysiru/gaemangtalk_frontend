import React from 'react';

import styled from 'styled-components';

// Components
import ChatList from '../components/ChatList';
import MessageList from '../components/MesseageList';

// Elements
import ChatName from '../elements/ChatName';


// 채팅 페이지 컴포넌트
const Chat = (props) => {
  return (
    <Container>
      <ChatList />
      <ChatWrap>
        <ChatName />
        <MessageList />
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
`

export default Chat;