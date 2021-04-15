import React from 'react';

import styled from 'styled-components';

import { Text } from '../elements'

import { getCookie } from '../shared/cookie';

// 사용자 - 상대방의 메시지 내용을 출력할 말풍선 컴포넌트
const Message = (props) => {

  const username = getCookie('username')
  const { messageInfo } = props;
  return (
    <MessageWrap>
      <ElMessage>
        {messageInfo.message}
      </ElMessage>
    </MessageWrap>

  )

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

export default Message;