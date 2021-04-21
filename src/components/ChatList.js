import React from 'react';

import styled from 'styled-components';

// elements
import { Button } from '../elements';

// components
import Chat from './Chat';
import Popup from '../components/Popup';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';

// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

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
  const dispatch = useDispatch();
  // 채팅 리스트 리덕스로부터 가져오기
  //const chat_list = useSelector((state) => state.chat.chatInfo);
  const chat_list = [
    {
      id: 1,
      chatRoomName: '무야호gggggggggggggggggggggggggggggggggggggggg',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    },
    {
      id: 2,
      chatRoomName: '무야호',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    },
    {
      id: 3,
      chatRoomName: '무야호',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    },
    {
      id: 4,
      chatRoomName: '무야호',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    },
    {
      id: 5,
      chatRoomName: '무야호',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    },
    {
      id: 6,
      chatRoomName: '무야호',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    },
    {
      id: 7,
      chatRoomName: '무야호',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    },
    {
      id: 8,
      chatRoomName: '무야호',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    },
    {
      id: 9,
      chatRoomName: '무야호',
      createdAt: '2020-02-02',
      modifiedAt: '2020-02-02',
      chatRoomImg:
        'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg',
      user: {
        userName: '무야호 할아버지',
        profileUrl:
          'https://img.khan.co.kr/news/2021/03/14/l_2021031401001628900137951.jpg'
      }
    }
  ];

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

  // 채팅방 들어가기
  const enterRoom = (roomId, roomName) => {
    console.log(prevRoomId, roomId);

    // 입장한 채팅방을 다시 클릭하면 리턴
    if (prevRoomId === roomId) {
      return;
    }

    dispatch(chatActions.clearMessages());
    dispatch(chatActions.moveChat({ roomId: roomId, roomName: roomName }));
    // 해당 채팅방의 DB 가져오기
    dispatch(chatActions.getChatMessages());
    return;
  };

  return (
    <Container>
      <Title>Chat</Title>
      <ChatListWrap className="scroll">
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
              _onClick={(e) => {
                enterRoom(info.id, info.chatRoomName);
              }}
            />
          );
        })}
      </ChatListWrap>
      <Button is_float _onClick={openPopup}>
        +
      </Button>

      {/* 채팅 생성 팝업 창 */}
      {popupOpen && <Popup visible={popupOpen} closePopup={closePopup} />}
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  justify-content: center;
  background-color: ${(props) => props.theme.theme_gray};
  width: 30%;
  height: 100%;
  position: relative;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 15vh;
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
  padding: 0px 10px 0px 10px;
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;

  @media ${(props) => props.theme.mobile} {
    flex-direction: row;
    align-items: center;

    padding: 0;
  }
`;

export default ChatList;
