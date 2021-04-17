import React from 'react';

import styled from 'styled-components';

// 리덕스 접근
import { useSelector } from 'react-redux';


// 현재 존재하는 채팅을 보여주는 컴포넌트
const Chat = (props) => {
  const { roomName, _onClick, roomId } = props;

  // 사용자의 현재 방 id  가져오기
  const currentRoomId = useSelector((state) => state.chat.currentChat.roomId);

  let is_same = false;
  // 사용자의 현재 방 id와 채팅 리스트의 방 id가 같은 경우
  if (currentRoomId === roomId) {
    is_same = true;
  }


  // key={idx}
  // roomId={info.id}
  // roomName={info.chatRommName}
  // createdAt={info.createdAt}
  // modifiedAt={info.modifiedAt}

  return (
    <Container
      onClick={_onClick}
      selected={is_same}
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
  border-left: ${(props) => props.selected ? `5px solid #F99750;`
    : 'none;'}
  
  padding: 5px;
  height: 8%;
  width: 100%;
  background-color: whitesmoke;
  font-weight: 600;
  ${(props) => props.theme.border_box};
  margin: 0px 0px 10px 0px;
  cursor: pointer;
  color: ${(props) => props.theme.font_color}
`



export default Chat;