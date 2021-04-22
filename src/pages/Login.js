import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { Button, Input, Wrapper } from '../elements';
import ErrorMsg from '../elements/ErrorMsg';
import { userActions } from '../redux/modules/user';
import { KAKAO_JS_ID } from '../shared/common';

import useInput from '../shared/useInput';
import KaKaoLogin from 'react-kakao-login';

// 로그인 페이지 컴포넌트
const Login = ({ history, match }) => {
  const dispatch = useDispatch();
  // email, password 입력 value
  // useInput  setValue(e.target.value)를 사용하기 위해 만든 hook
  const [email, setEmail, onChangeEmail] = useInput('');
  const [password, setPassword, onChangePassword] = useInput('');
  const loginError = useSelector((state) => state.user.loginError);
  const username = useSelector((state) => state.user.userInfo?.username);

  useEffect(() => {
    return () => {
      // 로그인 에러가 있다면 null 처리
      dispatch(userActions.setLoginError(null));
    };
  }, []);

  // 로그인
  const onLogin = () => {
    if (!email || !password) return;

    dispatch(userActions.fetchLogin({ email, password }));
  };

  // 카카오 로그인
  const kakaoLoginSuccessHandler = (res) => {
    const data = res.response;
    // 카카오 로그인 후 받아온 토큰
    dispatch(
      userActions.loginByKakao({
        kakaoToken: data.access_token
      })
    );
  };

  return (
    <Container>
      {username && (
        <Wrapper is_column>
          {username}님 환영합니다
          <Wrapper margin="1rem 0">
            <Button _onClick={() => history.push('/chat')}>
              채팅방으로 입장
            </Button>
          </Wrapper>
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
          <Wrapper>
            <KaKaoLogin
              //styled component 통해 style을 입혀 줄 예정
              token={KAKAO_JS_ID}
              //카카오에서 할당받은 jsKey를 입력
              render={(props) => (
                <KakaoButton onClick={props.onClick}></KakaoButton>
              )}
              //로그인 버튼의 text를 입력
              onSuccess={kakaoLoginSuccessHandler}
              //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장
              getProfile={true}
            ></KaKaoLogin>
          </Wrapper>

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

const KakaoButton = styled.div`
  cursor: pointer;
  width: 100%;
  height: 45px;
  background-color: #ffeb00;
  color: #000000;
  border-radius: 12px;
  background-image: url('kakao_login_large_wide.png');
  background-size: cover;
`;

export default Login;
