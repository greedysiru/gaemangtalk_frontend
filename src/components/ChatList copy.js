import React from 'react';

import styled from 'styled-components';

// components
import Chat from './Chat';
import Popup from '../components/Popup';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';

// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

// select
import { Select } from '@class101/ui';

// 카테고리 통신
import { chatAPI } from '../shared/api';

// 채팅 리스트 컴포넌트
// 모바일, 데스크탑에 따라 위치가 달리지도록 한다
//  모바일 : 채팅 리스트를 상단의 원으로 표시
//  데스크탑 : 채팅 리스트를 좌측에 리스트로 표시
const ChatList = (props) => {
  const dispatch = useDispatch();
  // 채팅 리스트 리덕스로부터 가져오기
  const chat_list = useSelector((state) => state.chat.chatInfo);
  // 조회할 태그(카테고리)
  const [tag, setTag] = React.useState('');

  const { prevRoomId } = props;

  // 팝업창 키기/종료
  //  false가 기본 상태
  const [popupOpen, setPopupOpen] = React.useState(false);

  // 팝업창 키기/끄기 함수
  const openPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };
  //  태그 고르기
  const selectTag = async (e) => {
    if (e.target.value === '전체조회') {
      // 전체조회를 선택한 경우 전체조회 API 호출
      const totalList = await chatAPI.getChatList();
      dispatch(chatActions.getChat(totalList.data));
      return
    }
    const tagChatList = await chatAPI.selectCategory(e.target.value);
    console.log(tagChatList)
    dispatch(chatActions.getChat(tagChatList.data))
  }
  // 채팅방 들어가기
  const enterRoom = (roomId, roomName, category) => {
    console.log(prevRoomId, roomId);

    // 입장한 채팅방을 다시 클릭하면 리턴
    if (prevRoomId === roomId) {
      return;
    }

    dispatch(chatActions.clearMessages());
    dispatch(chatActions.moveChat({ roomId: roomId, roomName: roomName, category: category }));
    // 해당 채팅방의 DB 가져오기
    dispatch(chatActions.getChatMessages());
    return;
  };

  return (
    <Container>
      <Title>Chat</Title>
      <ChatListWrap className="scroll">
        <SelectWrap>
          <Select
            value={tag}
            placeholder="채팅방 카테고리를 골라주세요"
            options={['전체조회', 'REACT', 'SPRING', 'RN', 'NODEJS']}
            onChange={(e) => { selectTag(e) }}
            style={{
              marginBottom: '20px',
              width: '90%',
            }}
          />
        </SelectWrap>
        {/* 받아온 채팅 리스트 구현하기 */}
        {chat_list.map((info, idx) => {
          return (
            <Chat
              key={idx}
              roomId={info.id}
              roomName={info.chatRoomName}
              createdAt={info.createdAt}
              modifiedAt={info.modifiedAt}
              roomImg={info.chatRoomImg}
              userName={info.user?.username}
              userProfile={info.user?.profileUrl}
              category={info.category}
              _onClick={(e) => {
                enterRoom(info.id, info.chatRoomName, info.category);
              }}
            />
          );
        })}
      </ChatListWrap>
      <FloatingButton onClick={openPopup}>+</FloatingButton>

      {/* 채팅 생성 팝업 창 */}
      {popupOpen && <Popup visible={popupOpen} closePopup={closePopup} />}
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  justify-content: center;
  background-color: ${(props) => props.theme.theme_gray};
  width: 30%;
  height: 100%;
  position: relative;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 15%;
  }
`;

const Title = styled.div`
  ${(props) => props.theme.border_box};
  height: 10%;
  color: ${(props) => props.theme.font_color};
  padding: 20px 20px 20px 30px;
  font-size: 26px;
  font-weight: 700;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const ChatListWrap = styled.div`
  ${(props) => props.theme.border_box};
  width: 100%;
  height: 90%;
  overflow: auto;
  padding: 90px 10px 0px 10px;
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;

  @media ${(props) => props.theme.mobile} {
    hieght: 100%;
    flex-direction: row;
    align-items: center;
  }
`;

const FloatingButton = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 50px;
  right: 16px;
  background-color: ${(props) => props.theme.theme_yellow};
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  border-radius: 50%;
  text-align: center;
  padding: 3px;
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
    position: fixed;
    top: 22vh;
  }
`;

const SelectWrap = styled.div`
${(props) => props.theme.border_box};
  text-align: center;
  position: absolute;
  padding: 0px 10px;
  width: 100%;
  background-color: ${(props) => props.theme.theme_gray};
  @media ${(props) => props.theme.mobile} {
    position: static;;
    width: 10%;
  }
`

export default ChatList;
