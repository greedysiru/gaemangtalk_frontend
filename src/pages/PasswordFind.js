import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Text, Wrapper } from '../elements';
import ErrorMsg from '../elements/ErrorMsg';
import useInput from '../shared/useInput';
import { testEmailValid } from '../shared/common';
import { userActions } from '../redux/modules/user';
// 비밀번호 찾기 페이지
const PasswordSearch = ({ history }) => {
  const dispatch = useDispatch();
  // 인증메일을 전송하면 인증번호가 날아감! 그 번호를 store에 저장. 그 인증번호를 가져옴
  const authNumber = useSelector((state) => state.user.authNumber);

  // status : input(이메일입력) -> update(변경)
  const [status, setStatus] = useState('input');
  const [isError, setIsError] = useState(null);

  const [email, setEmail, onChangeEmail] = useInput('');
  const [number, setNumber, onChangeNumber] = useInput('');
  const [password, setPassword, onChangePassword] = useInput('');
  const [passwordChk, setPasswordChk, onChangePasswordChk] = useInput('');

  // 인증번호 입력창, 비밀번호 변경창 이동 - translateX 속성으로 변경
  const onClickButton = () => {
    if (status === 'input') {
      checkAuthNumber();
    } else if (status === 'update') {
      updatePassword();
    }
  };
  // 인증메일 전송
  const sendAuthMail = () => {
    dispatch(userActions.setAuthNumber(null));

    if (!testEmailValid(email)) {
      return setIsError('이메일 형식으로 입력해주세요');
    }

    setIsError(null);
    dispatch(userActions.findPassword(email));
  };

  // 인증하기 버튼 - 메일로 온 인증번호가 입력한 인증번호가 같은지 확인
  const checkAuthNumber = () => {
    setIsError(null);
    if (number === authNumber) {
      setStatus('update');
    } else {
      setIsError('인증번호가 일치하지 않습니다');
    }
  };

  // 비밀번호 변경
  const updatePassword = () => {
    setIsError(null);

    if (password !== passwordChk) {
      return setIsError('동일한 비밀번호를 입력해주세요');
    }

    const data = { email, password };
    dispatch(userActions.updatePassword(data));
  };

  // 취소 - 이전단계 버튼 이벤트
  const goBack = () => {
    if (status === 'input') {
      return history.push('/');
    } else if (status === 'auth') {
      return setStatus('input');
    } else if (status === 'update') {
      return setStatus('auth');
    }
  };
  return (
    <Container>
      <Title>패스워드 찾기</Title>
      <OutterWrapper>
        <InnerWrapper status={status}>
          <Stage>
            <Wrapper margin="0.5em 0">
              <Input
                value={email}
                _onChange={onChangeEmail}
                placeholder="이메일을 입력해주세요"
              ></Input>
              <Wrapper width="40%" margin="0.5rem">
                <Button _onClick={sendAuthMail}>인증메일 전송</Button>
              </Wrapper>
            </Wrapper>
            {authNumber && (
              <Input
                _onChange={onChangeNumber}
                placeholder="인증번호를 입력해주세요"
              ></Input>
            )}
          </Stage>

          <Stage>
            <Wrapper margin="0.5rem 0">
              <Input
                type="password"
                _onChange={onChangePassword}
                placeholder="변경할 비밀번호를 입력해주세요"
              ></Input>
            </Wrapper>
            <Input
              type="password"
              _onChange={onChangePasswordChk}
              placeholder="동일한 비밀번호를 입력해주세요"
            ></Input>
          </Stage>
        </InnerWrapper>
      </OutterWrapper>
      <Wrapper margin="0.5rem 0">
        <ErrorMsg valid={isError}>{isError}</ErrorMsg>
      </Wrapper>
      <Wrapper margin="1rem">
        <Wrapper margin="0.5rem">
          <Button _onClick={goBack}>
            {status === 'input' ? '취소' : '이전단계'}
          </Button>
        </Wrapper>
        <Wrapper margin="0.5rem">
          <Button
            disabled={
              status === 'input' ? !authNumber : !password || !passwordChk
            }
            _onClick={onClickButton}
          >
            {status === 'input' ? '인증하기' : '비밀번호 변경'}
          </Button>
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 350px;
  height: 100%;

  ${(props) => props.theme.flex_column};
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  margin: 2rem;
  font-weight: 800;
  font-size: 1.5rem;
`;

const OutterWrapper = styled.div`
  width: 400px;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  ${(props) => props.theme.flex_row};
  justify-content: flex-start;
  width: calc(350 * 3px);
  transition: 0.3s;
  transform: ${(props) =>
    props.status === 'input' ? `translateX(0px)` : `translateX(-400px)`};
`;

const Stage = styled.div`
  width: 350px;
  margin: 0 25px;
`;

export default PasswordSearch;
