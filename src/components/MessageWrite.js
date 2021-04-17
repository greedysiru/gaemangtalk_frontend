import React from 'react';

import styled from 'styled-components';

// elements
import { Input } from '../elements';

// 아이콘
import { IoArrowUp } from "react-icons/io5";

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// 쿠키
import { getCookie } from '../shared/cookie';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';

// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

// 메시지 입력 컴포넌트
const MessageWrite = (props) => {
  const dispatch = useDispatch();
  // 메시지 텍스트 입력받기
  const [messageText, setMessageText] = React.useState();

  const { sendMessage } = props;

  const loading = useSelector((state) => state.chat.loading);

  // 텍스트 기록 함수
  const handleMessageText = (e) => {
    setMessageText(e.target.value)
    dispatch(chatActions.writeMessage(e.target.value));
  }

  // 오토 포커스 대상
  const autoFocusRef = React.useRef(null);
  React.useEffect(() => {
    autoFocusRef.current?.focus();
  }, [])

  // 메세지 보내기 함수
  // const sendMessage = () => {
  //   // dispatch(chatActions.sendMessage());
  //   // setMessageText('');
  //   // return
  //   const token = getCookie('access-token');
  //   const sender = getCookie('username');
  //   const roomId = localStorage.getItem('wschat.roomId');
  //   let sock = new SockJS("http://54.180.141.91:8080/chatting");
  //   let ws = Stomp.over(sock);
  //   // 보낼 데이터
  //   const messageData = {
  //     'type': 'TALK',
  //     'roomId': roomId,
  //     'sender': sender,
  //     'message': messageText,
  //     'senderEmail': null,
  //   }

  //   ws.connect({
  //     'token': token,
  //     // 'Access-Control-Allow-Origin': '*://*',
  //     // 'Access-Control-Allow-Methods': '*',
  //   }
  //     , () => {
  //       ws.send('/pub/api/chat/message', { 'token': token }, JSON.stringify(messageData))
  //     }
  //   );
  // }


  return (
    <Container>
      <Input
        MessageWrite
        value={messageText}
        _onChange={handleMessageText}
        onSubmit={() => {
          sendMessage();
          setMessageText('');
        }}
        ref={autoFocusRef}
        loading={loading}
      />

      {/* 로딩중이면 보내기 막기 */}
      {loading ? (
        <IconWrap
          onClick={() => {
            sendMessage();
            setMessageText('');

          }
          }
        >
          <IoArrowUp />
        </IconWrap>

      ) : null}

    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  background-color: ${(props) => props.theme.main_color_thick};
  justify-content: flex-start; 
  position: absolute;
  width:70%;
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
  cursor: pointer;
`

export default MessageWrite;
