import React from 'react';

import styled from 'styled-components';

// 로그인 페이지 컴포넌트
const Login = (props) => {
  return <Container>가</Container>;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.main_color};
  color: ${(props) => props.theme.theme_yellow};
`;

export default Login;
