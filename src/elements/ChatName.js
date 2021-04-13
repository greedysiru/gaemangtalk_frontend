import React from 'react';

import styled from 'styled-components';


// 사용자가 접속한 현재 채팅방의 이름을 표시할 최소단위 컴포넌트
const ChatName = (props) => {
  return (
    <Container>
      채팅방 이름
    </Container>

  )
}

const Container = styled.div`
${(props) => props.theme.border_box};
  width: 100%;
  height: 10%;
  background-color: ${(props) => props.theme.main_color_blur};
  color: ${(props) => props.theme.theme_yellow};
`;

export default ChatName;