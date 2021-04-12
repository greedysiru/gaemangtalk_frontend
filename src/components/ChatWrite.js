import React from 'react';

import styled from 'styled-components';

// 메시지 입력 컴포넌트
const MessageWrite = (props) => {
  return <Container>가</Container>;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.main_color};
  color: ${(props) => props.theme.theme_yellow};
`;

export default MessageWrite;
