import React from 'react';

import styled from 'styled-components';


// 사용자가 접속한 현재 채팅방의 이름을 표시할 최소단위 컴포넌트
const ChatName = (props) => {
  return (
    <Container>
      가
    </Container>

  )
}

const Container = styled.div`
  background-color: ${(props) => props.theme.main_color};
  color: ${(props) => props.theme.theme_yellow};
`;

export default ChatName;