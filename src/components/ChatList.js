import React from 'react';

import styled from 'styled-components';

// elements
import { Button } from '../elements';

// components
import Chat from './Chat';
import Popup from '../components/Popup';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// 쿠키
import { getCookie } from '../shared/cookie';


// 채팅 리스트 컴포넌트
// 모바일, 데스크탑에 따라 위치가 달리지도록 한다
//  모바일 : 채팅 리스트를 상단의 원으로 표시
//  데스크탑 : 채팅 리스트를 좌측에 리스트로 표시
const ChatList = (props) => {

  // 채팅 리스트 리덕스로부터 가져오기
  const chat_list = useSelector((state) => state.chat.chatInfo)

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

  // 채팅방 들어가기
  const enterRoom = (roomId, roomName) => {
    // 클릭한 채팅방 정보 로컬 스토리지에 저장
    localStorage.setItem('wschat.roomId', roomId);
    localStorage.setItem('wschat.roomName', roomName);
    const token = getCookie('access-token');
    console.log(token)
    let sock = new SockJS("http://54.180.141.91:8080/chatting");
    let ws = Stomp.over(sock);
    ws.connect({
      'token': token,
      'Access-Control-Allow-Origin': '*://*',
      'Access-Control-Allow-Methods': '*',
    }
      , () => {
        ws.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
          const newMessage = JSON.parse(data.body);
          console.log(newMessage)
        });
      }
    );

  }

  React.useEffect(() => {


  }, [])

  return (
    <Container className="scroll">
      <Title>
        Chat
      </Title>
      <ChatListWrap>
        {/* 받아온 채팅 리스트 구현하기 */}
        {chat_list.map((info, idx) => {
          return (< Chat
            key={idx}
            roomId={info.id}
            roomName={info.chatRoomName}
            createdAt={info.createdAt}
            modifiedAt={info.modifiedAt}
            _onClick={(e) => { enterRoom(info.id, info.chatRoomName) }}
          />)
        })}
      </ChatListWrap>
      <Button
        is_float
        _onClick={openPopup}
      >+</Button>

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
  background-color: ${(props) => props.theme.main_color_blur};
  width: 20%;
  height: 100%;
  padding: 10px;
  position: relative;

`;

const Title = styled.div`
  ${(props) => props.theme.border_box};
  height: 10%;
  color: ${(props) => props.theme.font_color};
  padding: 10px;
  font-size: 26px;
  font-weight: 700;
`

const ChatListWrap = styled.div`
${(props) => props.theme.border_box};
width: 100%;
height: 90%;
overflow: auto;
`

export default ChatList;