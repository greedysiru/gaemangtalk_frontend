import React from 'react';

import styled from 'styled-components';

// 현재 존재하는 채팅을 보여주는 컴포넌트
const Chat = (props) => {
  return (
    <Container>
      채팅
    </Container>
  )
}

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  padding: 5px;
  height: 9%;
  width: 100%;
  background-color: ${(props) => props.theme.theme_gray};
  ${(props) => props.theme.border_box};
  margin: 0px 0px 5px 0px;
`



export default Chat;