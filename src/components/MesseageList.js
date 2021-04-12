import React from 'react';

import styled from 'styled-components';

// elements
import Message from '../elements/Message';


// 메시지 리스트 컴포넌트
const MessageList = (props) => {
  return (
    <Container>
      메시지리스트
      <Message />
    </Container>

  )
}

const Container = styled.div`
  background-color: ${(props) => props.theme.main_color};
  color: ${(props) => props.theme.theme_yellow};
`;

export default MessageList;