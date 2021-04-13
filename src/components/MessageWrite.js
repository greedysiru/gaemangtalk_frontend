import React from 'react';

import styled from 'styled-components';

// elements
import { Input } from '../elements';

// 아이콘
import { IoArrowUp } from "react-icons/io5";

// 메시지 입력 컴포넌트
const MessageWrite = (props) => {
  return (
    <Container>
      <Input
        messageWrite
      />
      <IconWrap>
        <IoArrowUp />
      </IconWrap>
    </Container>);
};

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  background-color: ${(props) => props.theme.main_color_thick};
  justify-content: center; 
  position: absolute;
  width:100%;
  height: 8%;
  top: 92%;
  opacity: 0.6;
`;

const IconWrap = styled.div`
  ${(props) => props.theme.flex_row};
  color: whitesmoke;
  justify-content: center;
  height:100%;
  width:5%;
  font-size: 25px;
`

export default MessageWrite;
