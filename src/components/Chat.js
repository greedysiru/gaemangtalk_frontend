import React from 'react';

import styled from 'styled-components';

// 현재 존재하는 채팅을 보여주는 컴포넌트
const Chat = (props) => {
  const { roomName, _onClick } = props;

  // key={idx}
  // roomId={info.id}
  // roomName={info.chatRommName}
  // createdAt={info.createdAt}
  // modifiedAt={info.modifiedAt}
  return (
    <Container
      onClick={_onClick}
    >
      {roomName}
    </Container>
  )
}


Chat.defaultProps = {
  _onClick: () => { },
  roomName: false,
};


const Container = styled.div`
  ${(props) => props.theme.flex_row};
  padding: 5px;
  height: 8%;
  width: 100%;
  background-color: whitesmoke;
  font-weight: 600;
  ${(props) => props.theme.border_box};
  margin: 0px 0px 5px 0px;
  cursor: pointer;
`



export default Chat;