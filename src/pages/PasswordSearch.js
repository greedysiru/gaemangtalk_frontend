import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Wrapper } from '../elements';
import ErrorMsg from '../elements/ErrorMsg';
import useInput from '../shared/useInput';

const PasswordSearch = ({ history }) => {
  // status : input(이메일입력) -> auth(인증) -> update(변경)
  const [status, setStatus] = useState('input');

  const [email, setEmail, onChangeEmail] = useInput('');
  const [authNumber, setAuthNumber, onChangAuthNumber] = useInput('');
  const [password, setPassword, onChangePassword] = useInput('');
  const [passwordChk, setPasswordChk, onChangePasswordChk] = useInput('');

  const sendEmail = () => {
    console.log(email);
    setStatus('auth');
    setEmail('');
  };

  const onAuth = () => {
    setStatus('update');
  };

  const updatePassword = () => {
    console.log('변경하기');
  };

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
            <Input
              value={email}
              _onChange={onChangeEmail}
              placeholder="이메일을 입력해주세요"
            ></Input>

            <Wrapper margin="1rem 0">
              <Button _onClick={goBack}>취소</Button>
              <Button _onClick={sendEmail}>찾기</Button>
            </Wrapper>
          </Stage>

          <Stage>
            <Input
              _onChange={onChangAuthNumber}
              placeholder="인증번호를 입력해주세요"
            ></Input>
            <Wrapper margin="1rem 0">
              <Button _onClick={goBack}>이전단계</Button>
              <Button _onClick={onAuth}>인증</Button>
            </Wrapper>
          </Stage>

          <Stage>
            <Wrapper margin="0.5rem 0">
              <Input
                _onChange={onChangePassword}
                placeholder="변경할 비밀번호를 입력해주세요"
              ></Input>
            </Wrapper>
            <Input
              _onChange={onChangePasswordChk}
              placeholder="동일한 비밀번호를 입력해주세요"
            ></Input>
            <Wrapper margin="1rem 0">
              <Button _onClick={goBack}>이전단계</Button>
              <Button _onClick={updatePassword}>변경하기</Button>
            </Wrapper>
          </Stage>
        </InnerWrapper>
      </OutterWrapper>
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
  width: 350px;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  ${(props) => props.theme.flex_row};
  justify-content: flex-start;
  width: calc(350 * 3px);
  transition: 0.3s;
  transform: ${(props) =>
    props.status === 'input'
      ? `translateX(0px)`
      : props.status === 'auth'
      ? `translateX(-350px)`
      : `translateX(-700px)`};
`;

const Stage = styled.div`
  width: 300px;
  margin: 0 25px;
`;

export default PasswordSearch;
