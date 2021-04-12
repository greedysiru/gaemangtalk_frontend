import React from 'react';

import styled from 'styled-components';


// 사용자 - 상대방의 메시지 내용을 출력할 말풍선 컴포넌트
const Message = (props) => {
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

export default Message;