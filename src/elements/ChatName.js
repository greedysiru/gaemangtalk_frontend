import React from 'react';

import styled from 'styled-components';

// 사용자가 접속한 현재 채팅방의 이름을 표시할 최소단위 컴포넌트
const ChatName = (props) => {
  const { roomName, category } = props;
  // 카테고리 2개까지 표시
  const categoryInfo = [];
  for (let i = 0; i < 2; i++) {
    if (category[i] === undefined) {
      continue
    }
    categoryInfo.push(category[i])
  }
  return <Container>{roomName}
    {categoryInfo.map((c, idx) => {
      return (
        <TagWrap
          key={idx}
        >
          {c}
        </TagWrap>

      )
    })}


  </Container>;
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row}
  justify-content: flex-start;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 10%;
  background-color: ${(props) => props.theme.theme_gray};
  ${(props) => props.theme.border_box};
  color: ${(props) => props.theme.font_color};
  padding: 20px;
  font-size: 26px;
  font-weight: 700;
  @media ${(props) => props.theme.mobile} {
    font-size: 1rem;
  }
`;

const TagWrap = styled.div`
  margin: 0px 5px;
  padding: 5px;
  font-size: 1rem;
  background-color: orange;
  border-radius: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: 0.5rem;
  }
  color: whitesmoke;
`

export default ChatName;
