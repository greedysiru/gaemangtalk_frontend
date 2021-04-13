import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { Button, Input, Text, Wrapper } from '../elements';
import ErrorMsg from '../elements/ErrorMsg';
import { userActions } from '../redux/modules/user';
import useInput from '../shared/useInput';

// 로그인 페이지 컴포넌트
const Login = (props) => {
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
  return (
    <Container>
      {username && <div>{username}님 환영합니다</div>}
      {!username && (
        <Wrapper is_column>
          <Text>로그인</Text>
          <Input
            _onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요"
          ></Input>
          <Input
            type="password"
            value={password}
            is_submit
            onSubmit={onLogin}
            _onChange={onChangePassword}
            placeholder="비밀번호를 입력해주세요"
          ></Input>
          <ErrorMsg valid={loginError}>{loginError}</ErrorMsg>
          <Button disabled={!email || !password} _onClick={onLogin}>
            로그인
          </Button>
          <Button _onClick={() => props.history.push('/signup')}>
            회원가입
          </Button>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_column};
  justify-content: center;

  border: 1px solid black;
`;

export default Login;
