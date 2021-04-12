import React from 'react';

import styled from 'styled-components';


// 채팅 리스트 컴포넌트
// 모바일, 데스크탑에 따라 위치가 달리지도록 한다
//  모바일 : 채팅 리스트를 상단의 원으로 표시
//  데스크탑 : 채팅 리스트를 좌측에 리스트로 표시
const ChatList = (props) => {
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

export default ChatList;