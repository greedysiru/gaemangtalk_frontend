import { stripLeadingSlash } from 'history/PathUtils';
import React from 'react';

import styled from 'styled-components';

import { getCookie } from '../shared/cookie';

// 리덕스 접근
import { useSelector, useDispatch } from 'react-redux';

// noroom
import NoRoom from '../components/NoRoom';

// 프로필 사진
import { Image } from '../elements';

// Spinner
import { Spinner } from '@class101/ui';

// 사용자 - 상대방의 메시지 내용을 출력할 말풍선 컴포넌트
const Message = (props) => {
  const email = getCookie('email');
  // 사용자 아이디, 프로필 사진을 가져오기
  let { userId, profileUrl } = useSelector((state) => state.user.userInfo);
  // 상대방의 프로필 사진을 가져오기
  if (!userId) {
    userId = getCookie('userId');
  }
  const { messageInfo } = props;
  React.useEffect(() => {

    // 로딩중
    if (!messageInfo) {
      return (
        <MessageWrap>
          <Spinner />
        </MessageWrap>
      )
    }

  }, [])


  // 타임 스탬프
  let time = ''
  if (!(messageInfo.createdAt === null)) {
    time = messageInfo.createdAt.split(' ')[1];
  }

  // 사용자 본인 메시지
  // 일반로그인 유저(이전)


  // 이메일과 비교
  if (messageInfo.senderEmail === email) {
    return (
      <MessageWrap is_me={true}>
        <SenderWrap >
          <SenderSpan is_me={true}>
            {messageInfo.sender}
          </SenderSpan>
          <ElMessage is_me={true}>
            {messageInfo.message}
          </ElMessage>
          <SenderSpan is_me={true}>
            {time}
          </SenderSpan>
        </SenderWrap>
        <ImageWrap>
          <Image
            size="40px"
            src={profileUrl}
          />
        </ImageWrap>
      </MessageWrap>
    )

  }
  // 유저 아이디와 비교(최신 버전)

  if (userId == messageInfo.userId) {
    return (
      <MessageWrap is_me={true}>
        <SenderWrap >
          <SenderSpan is_me={true}>
            {messageInfo.user ? messageInfo.user.username : messageInfo.sender}
          </SenderSpan>
          <ElMessage is_me={true}>
            {messageInfo.message}
          </ElMessage>
          <SenderSpan is_me={true}>
            {time}
          </SenderSpan>
        </SenderWrap>
        <ImageWrap>
          <Image
            size="40px"
            src={profileUrl}
          />
        </ImageWrap>
      </MessageWrap>
    )
  }
  if (messageInfo.type === "ENTER") {
    return (
      <EnterWrap >
        {messageInfo.message}
      </EnterWrap>
    )
  }
  if (messageInfo.type === "QUIT") {
    return (
      <QuitWrap >
        {messageInfo.message}
      </QuitWrap>
    )
  }
  // 상대방 메시지
  else {
    return (
      < MessageWrap >
        <ImageWrap>
          <Image
            size="40px"
            src={messageInfo.user?.profileUrl}
          />
        </ImageWrap>
        <SenderWrap>
          <SenderSpan>
            {messageInfo.user.username}
          </SenderSpan>
          <ElMessage >
            {messageInfo.message}
          </ElMessage>
          <SenderSpan>
            {time}
          </SenderSpan>
        </SenderWrap>

      </MessageWrap >
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
  margin: 0px 0px 50px 0px;
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
  width: 40%;
  height: auto;
  padding: 5px;
  margin: 0px 0px 60px 0px;
  background-color:${(props) => props.theme.theme_yellow};
  color: whitesmoke;
  border-radius: 40px;
  opacity: 0.6;
  @media ${(props) => props.theme.mobile} {
    width: 80%;
  }
`

const QuitWrap = styled.div`
${(props) => props.theme.border_box};
${(props) => props.theme.flex_row};
justify-content: center;
width: 40%;
height: auto;
padding: 5px;
margin: 0px 0px 60px 0px;
background-color:${(props) => props.theme.main_color_thick};
color: whitesmoke;
border-radius: 40px;
opacity: 0.6;
@media ${(props) => props.theme.mobile} {
  width: 80%;
}
`

const SenderWrap = styled.div`
${(props) => props.theme.flex_column};
color: ${(props) => props.theme.main_color};
`

const SenderSpan = styled.span`
min-width: 50px;
width: 90%;
${(props) => props.is_me ? 'text-align: right' : 'text-align: left'};
margin: 5px 0px;
`

const ImageWrap = styled.div`
${(props) => props.theme.flex_column};
justify-content: flex-end;
${(props) => props.theme.border_box};
height: 130%;
margin: 5px;
`
export default Message;