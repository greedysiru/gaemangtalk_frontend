import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { Button, Input, Text, Wrapper } from '../elements';
import ErrorMsg from '../elements/ErrorMsg';
import { userActions } from '../redux/modules/user';
import { deleteCookie } from '../shared/cookie';
import useInput from '../shared/useInput';

// 로그인 페이지 컴포넌트
const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail, onChangeEmail] = useInput('');
  const [password, setPassword, onChangePassword] = useInput('');
  const loginError = useSelector((state) => state.user.loginError);
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    return () => {
      dispatch(userActions.setLoginError(null));
    };
  }, []);
  const onLogin = () => {
    if (!email || !password) return;

    dispatch(userActions.login({ email, password }));
  };

  const logout = () => {
    deleteCookie('access-token');
    deleteCookie('username');
    deleteCookie('email');
    dispatch(userActions.logout());
  };
  return (
    <Container>
      {username && (
        <Wrapper>
          {username}님 환영합니다 <Button _onClick={logout}>로그아웃</Button>
        </Wrapper>
      )}
      {!username && (
        <Wrapper is_column>
          <Title>로그인</Title>
          <Wrapper margin="0.5rem 0">
            <Input
              _onChange={onChangeEmail}
              placeholder="이메일을 입력해주세요"
            ></Input>
          </Wrapper>
          <Input
            type="password"
            value={password}
            is_submit
            onSubmit={onLogin}
            _onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요"
          ></Input>
          <Wrapper margin="0.5rem 0">
            <SearchPassword onClick={() => history.push('/findPassword')}>
              비밀번호 찾기
            </SearchPassword>
          </Wrapper>
          <Wrapper margin="0.5rem 0">
            <ErrorMsg valid={loginError}>{loginError}</ErrorMsg>
          </Wrapper>
          <KakaoButton src="https://s3.ap-northeast-2.amazonaws.com/yoooook.xyz/kakao_login_medium_wide.png" />
          <Wrapper margin="0.5rem 0">
            <Button disabled={!email || !password} _onClick={onLogin}>
              로그인
            </Button>
          </Wrapper>
          <Wrapper>
            <Button _onClick={() => history.push('/signup')}>회원가입</Button>
          </Wrapper>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 300px;
  height: 100%;
  ${(props) => props.theme.flex_column};
  justify-content: center;
`;
const Title = styled.span`
  margin: 2rem;
  font-weight: 800;
  font-size: 1.5rem;
`;
const SearchPassword = styled.span`
  margin: 0.5rem 0;
  cursor: pointer;
  width: 100%;
  text-align: right;
  padding-right: 0.5rem;
  color: gray;
  font-size: 0.75rem;
`;

const KakaoButton = styled.img`
  //width: 100%;
`;

export default Login;
