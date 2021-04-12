import React from 'react';

import styled from 'styled-components';

// elements
import { Input } from '../elements';

// 메시지 입력 컴포넌트
const MessageWrite = (props) => {
  return (
    <Container>
      <Input
        messageWrite
      />
    </Container>);
};

const Container = styled.div`
  background-color: ${(props) => props.theme.main_color};
  color: ${(props) => props.theme.theme_yellow};
  position: absolute;
  width:90%;
  top: 90%;
`;

export default MessageWrite;
