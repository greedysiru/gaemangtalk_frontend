import React from 'react';
import styled from 'styled-components';

// History
import { withRouter } from 'react-router';
import { history } from '../redux/configureStore';

// 없는 경로에 들어오면 보여줄 컴포넌트
const NotFound = (props) => {
  return <Container>임시페이지입니다! 추후에 NotFound로 사용할 예정</Container>;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.main_color};
  color: ${(props) => props.theme.theme_yellow};
`;

export default NotFound;
