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
    // 가로모드 감지, 경고창
    window.addEventListener("orientationchange", function () {
      if (window.orientation == -90 || window.orientation == 90) {
        if (window.innerWidth > 375) {
          return
        }
        window.alert('이 웹사이트는 세로모드를 권장합니다. 세로모드로 전환해주세요 🙏')
      }
    }, false);

    const token = getCookie('access-token');

    if (token && !is_login) {
      axios.defaults.headers.common['token'] = `${token}`;
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

  // 로그인 상태일 때 헤드 출력
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
  ${(props) => props.theme.flex_column};
  @media ${(props) => props.theme.desktop} {
    flex-direction: row;
    over-flow: scroll;
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
