import React from 'react';

import styled from 'styled-components';

// elements
import Message from '../elements/Message';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';

// 채팅 관련 함수들 가져오기
import { chatActions } from '../redux/modules/chat';

// 메시지 리스트 컴포넌트
const MessageList = (props) => {
  const messages = useSelector((state) => state.chat.messages);

  const dispatch = useDispatch();

  // 스크롤 대상
  const messageEndRef = React.useRef(null);
  //  하단 스크롤 함수
  const scrollTomBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  // 렌더링시 이동
  React.useEffect(() => {
    scrollTomBottom();
  }, [messages])

  // 메시지를 받아오면 가장 아래로 이동
  // if (messages) {
  //   dispatch(chatActions.moveScrollBottom());

  // }



  return (
    <Container className="scroll" id="messagelist">
      {messages.map((m, idx) => {

        return (<Message
          key={idx}
          messageInfo={m}
          is_me={true}

        />
        )
      })}

      <div ref={messageEndRef}></div>
    </Container>

  )
}

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  width: 100%;
  height: 90%;
  padding: 30px 60px 60px 60px;
  overflow: auto;
`;

export default MessageList;