import React from 'react';

import styled from 'styled-components';

// elements
import Message from '../elements/Message';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';

// 메시지 리스트 컴포넌트
const MessageList = (props) => {
  const messages = useSelector((state) => state.chat.messages);

  React.useEffect(() => {

  })

  return (
    <Container className="scroll">
      {messages.map((m, idx) => {

        return (<Message
          key={idx}
          messageInfo={m}
          is_me={true} />
        )
      })}


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