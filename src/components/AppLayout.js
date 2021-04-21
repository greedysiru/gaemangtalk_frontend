import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../shared/cookie';
import { userActions } from '../redux/modules/user';

function AppLayout(props) {
  const dispatch = useDispatch();
  const { is_login } = useSelector((state) => state.user);
  useEffect(() => {
    const token = getCookie('access-token');

    if (token && !is_login) {
      axios.defaults.headers.common['token'] = `${token}`;
      console.log(token);
      dispatch(userActions.fetchUserProfile());
    }
  }, []);
  // 로그인 하지 않은 경우
  if (!is_login) {
    return (
      <Container>
        <Main
          style={{
            width: '100%'
          }}
        >
          {props.children}
        </Main>
      </Container>
    );
  }

  if (is_login) {
    return (
      <Container>
        <Header />
        <Main>{props.children}</Main>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  min-width: 481px;
  ${(props) => props.theme.flex_column};

  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
  }
`;
const Main = styled.div`
  height: 100%;
  width: 100%;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  align-items: center;
`;

export default AppLayout;
