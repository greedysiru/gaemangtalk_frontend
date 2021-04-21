import React from 'react';

import styled from 'styled-components';

// 사용자가 접속한 현재 채팅방의 이름을 표시할 최소단위 컴포넌트
const ChatName = (props) => {
  const { roomName } = props;
  return <Container>{roomName}</Container>;
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 10%;
  background-color: ${(props) => props.theme.theme_gray};
  ${(props) => props.theme.border_box};
  color: ${(props) => props.theme.font_color};
  padding: 20px;
  font-size: 26px;
  font-weight: 700;
  @media ${(props) => props.theme.mobile} {
  }
`;

export default ChatName;
