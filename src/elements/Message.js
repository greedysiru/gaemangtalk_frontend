import React from 'react';

import styled from 'styled-components';

import { Text } from '../elements'

// 사용자 - 상대방의 메시지 내용을 출력할 말풍선 컴포넌트
const Message = (props) => {

  const { is_me } = props;
  return (
    <div style={{
      width: '100%'
    }}>
      <MessageWrap>
        <ElMessage>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap is_me={is_me}>
        <ElMessage is_me={is_me}>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap>
        <ElMessage>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap is_me={is_me}>
        <ElMessage is_me={is_me}>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap>
        <ElMessage>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap is_me={is_me}>
        <ElMessage is_me={is_me}>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap>
        <ElMessage>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap is_me={is_me}>
        <ElMessage is_me={is_me}>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap>
        <ElMessage>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap is_me={is_me}>
        <ElMessage is_me={is_me}>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap>
        <ElMessage>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap is_me={is_me}>
        <ElMessage is_me={is_me}>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap>
        <ElMessage>
          메시지
        </ElMessage>
      </MessageWrap>
      <MessageWrap is_me={is_me}>
        <ElMessage is_me={is_me}>
          메시지
        </ElMessage>
      </MessageWrap>

    </div>
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