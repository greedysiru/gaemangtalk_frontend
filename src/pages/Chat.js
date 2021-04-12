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
      <div
        style={{
          width: '30vw',
          backgroundColor: 'green'
        }}
      >
        헤더
      </div>
      <ChatName />
      <ChatList />
      <MessageList />

    </Container>

  )
}

const Container = styled.div`
  display: ${(props) => props.theme.flex_row};
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.theme_gray};
`;

export default Chat;