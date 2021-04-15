import React from 'react';

import styled from 'styled-components';

import { Text } from '../elements'

import { getCookie } from '../shared/cookie';

// 사용자 - 상대방의 메시지 내용을 출력할 말풍선 컴포넌트
const Message = (props) => {

  const email = getCookie('email')
  const { messageInfo } = props;
  if (messageInfo.senderEmail === email) {
    return (
      <MessageWrap is_me={true}>
        <ElMessage is_me={true}>
          {messageInfo.message}
        </ElMessage>
      </MessageWrap>

    )

  }
  else if (messageInfo.type === "ENTER") {
    return (

      <EnterWrap >
        {messageInfo.message}
      </EnterWrap>

    )
  } else {
    return (
      <MessageWrap >
        <ElMessage >
          {messageInfo.message}
        </ElMessage>
      </MessageWrap>
    )
  }

}

Message.defaultProps = {
}

const MessageWrap = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row};
  justify-content: ${(props) => props.is_me ? 'flex-end' : 'flex-start'} ;
  width: 100%;
  height: auto;
  margin: 0px 0px 30px 0px;
`

const ElMessage = styled.span`
  display: inline-block;
  ${(props) => props.theme.border_box};
  background-color: 
  ${(props) => props.is_me ? props.theme.message_me : props.theme.message_you};
  color: 
  ${(props) => props.is_me ? 'whitesmoke' : 'black'};
  ${(props) => props.is_me ?
    'border-radius: 15px 15px 0px 15px;' : 'border-radius: 15px 15px 15px 0px;'}
  padding: 15px;
  width: auto;
  height: auto;
`;

const EnterWrap = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row};
  justify-content: center;
  width: 80%;
  height: auto;
  padding: 5px;
  margin: 0px 0px 60px 0px;
  background-color:${(props) => props.theme.theme_yellow};
  color: whitesmoke;
  border-radius: 40px;
  opacity: 0.6;
`
export default Message;