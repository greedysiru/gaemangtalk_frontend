import React from 'react';

import styled from 'styled-components';

// elements
import Message from '../elements/Message';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';


// 메시지 리스트 컴포넌트
const MessageList = (props) => {
  const messages = useSelector((state) => state.chat.messages);

  const dispatch = useDispatch();

  // 스크롤 대상
  const messageEndRef = React.useRef(null);
  //  하단 스크롤 함수
  const scrollTomBottom = () => {
    // 모바일이면 실행하지 않기
    if (window.innerWidth <= 375) {
      return
    }
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  // 렌더링시 이동
  React.useEffect(() => {
    scrollTomBottom();
  }, [messages]);


  return (
    <Container className="scroll" id="messagelist">
      {messages.map((m, idx) => {
        return <Message key={idx} messageInfo={m} is_me={true} />;
      })}

      <div ref={messageEndRef}></div>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px 30px 60px 30px;
  overflow: auto;
  @media ${(props) => props.theme.mobile} {
    height: 90%;
    padding: 30px 10px 90px 10px;
  }
`;

export default MessageList;
