import React from 'react';

import styled from 'styled-components';

// elements
import { Button } from '../elements';

// components
import Chat from './Chat';
import Popup from '../components/Popup';


// 채팅 리스트 컴포넌트
// 모바일, 데스크탑에 따라 위치가 달리지도록 한다
//  모바일 : 채팅 리스트를 상단의 원으로 표시
//  데스크탑 : 채팅 리스트를 좌측에 리스트로 표시
const ChatList = (props) => {


  // 팝업창 키기/종료
  //  false가 기본 상태
  const [popupOpen, setPopupOpen] = React.useState(false);

  // 팝업창 키기/끄기 함수
  const openPopup = () => {
    setPopupOpen(true);
  }
  const closePopup = () => {
    setPopupOpen(false);
  }

  return (
    <Container>
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />
      <Chat />

      <Button
        is_float
        _onClick={openPopup}
      >
        +
  </Button>
      {/* 채팅 생성 팝업 창 */}
      {popupOpen && <Popup
        visible={popupOpen}
        closePopup={closePopup}
      />}

    </Container >

  )
}

const Container = styled.div`
  ${(props) => props.theme.border_box};
  background-color: ${(props) => props.theme.main_color};
  color: ${(props) => props.theme.theme_yellow};
  width: 20%;
  height: 100%;
  position: relative;
  padding: 10px;
`;

export default ChatList;