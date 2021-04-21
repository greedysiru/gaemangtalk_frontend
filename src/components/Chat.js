import React from 'react';

import styled from 'styled-components';

// 리덕스 접근
import { useSelector } from 'react-redux';

// 이미지 컴포넌트
import { Image } from '../elements';

// 현재 존재하는 채팅을 보여주는 컴포넌트
const Chat = (props) => {
  const { roomName, _onClick, roomId, roomImg, userName, userProfile } = props;

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
    <Container onClick={_onClick} selected={is_same}>
      <Image size="50px" src={roomImg} />
      <ChatColumn>
        <ChatTitle>{roomName}</ChatTitle>
        <ChatText>
          <Image size="15px" src={userProfile} />
          {userName}
        </ChatText>
      </ChatColumn>
    </Container>
  );
};

Chat.defaultProps = {
  _onClick: () => {},
  roomName: false
};

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  justify-content: flex-start;

  border-left: ${(props) => (props.selected ? `5px solid #F99750;` : 'none;')};
  padding: 5px;
  height: 15%;
  width: 100%;
  background-color: whitesmoke;
  ${(props) => props.theme.border_box}
  margin: 0px 0px 20px 0px;
  cursor: pointer;
  color: ${(props) => props.theme.font_color};

  @media ${(props) => props.theme.mobile} {
    height: 100%;
    margin: 0;
    padding: 0;
    flex-direction: column;
    justify-content: space-between;
    border-left: none;
    border-bottom: ${(props) =>
      props.selected ? `5px solid #F99750;` : 'none;'};
  }
`;
const ChatColumn = styled.div`
  margin-left: 15px;
  width: 70%;

  ${(props) => props.theme.flex_column}
  align-items: flex-start;
  justify-content: center;
  ${(props) => props.theme.border_box}

  @media ${(props) => props.theme.mobile} {
    width: 80px;
    margin-left: 0px;
  }
`;
const ChatTitle = styled.span`
  ${(props) => props.theme.border_box}
  font-weight: 600;
  font-size: 1.2rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${(props) => props.theme.mobile} {
    font-size: 0.75rem;
    text-align: center;
  }
`;

const ChatText = styled.div`
  ${(props) => props.theme.border_box}
  ${(props) => props.theme.flex_row}
  margin-top: 10px;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

export default Chat;
