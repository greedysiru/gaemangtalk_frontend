import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Wrapper } from '../elements';
import useInput from '../shared/useInput';

const PasswordSearch = ({ history }) => {
  // status : input(이메일입력) -> auth(인증) -> update(변경)
  const [status, setStatus] = useState('input');

  const [email, setEmail, onChangeEmail] = useInput('');
  const [authNumber, setAuthNumber, onChangAuthNumber] = useInput('');
  const [password, setPassword, onChangePassword] = useInput('');
  const [passwordChk, setPasswordChk, onChangePasswordChk] = useInput('');

  const sendEmail = () => {
    setStatus('auth');
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
      <Text>패스워드 찾기</Text>
      <OutterWrapper>
        <InnerWrapper status={status}>
          <Stage>
            <Input
              _onChange={onChangeEmail}
              placeholder="이메일을 입력해주세요"
            ></Input>
            <ButtonWapper>
              <Button _onClick={goBack}>취소</Button>
              <Button _onClick={sendEmail}>찾기</Button>
            </ButtonWapper>
          </Stage>

          <Stage>
            <Input
              _onChange={onChangAuthNumber}
              placeholder="인증번호를 입력해주세요"
            ></Input>
            <ButtonWapper>
              <Button _onClick={goBack}>이전단계</Button>
              <Button _onClick={onAuth}>인증</Button>
            </ButtonWapper>
          </Stage>

          <Stage>
            <Input
              _onChange={onChangePassword}
              placeholder="변경할 비밀번호를 입력해주세요"
            ></Input>
            <Input
              _onChange={onChangePasswordChk}
              placeholder="동일한 비밀번호를 입력해주세요"
            ></Input>
            <ButtonWapper>
              <Button _onClick={goBack}>이전단계</Button>
              <Button _onClick={updatePassword}>변경하기</Button>
            </ButtonWapper>
          </Stage>
        </InnerWrapper>
      </OutterWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_column};
  justify-content: center;
  align-items: center;
`;

const OutterWrapper = styled.div`
  width: 300px;
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  ${(props) => props.theme.flex_row};
  justify-content: flex-start;
  width: 900px;
  transition: 0.3s;
  transform: ${(props) =>
    props.status === 'input'
      ? `translateX(0px)`
      : props.status === 'auth'
      ? `translateX(-300px)`
      : `translateX(-600px)`};
`;

const Stage = styled.div`
  width: 300px;
`;

const ButtonWapper = styled.div`
  width: 100%;
  margin: 0.5rem 0;

  display: flex;
  justify-content: space-between;
`;

export default PasswordSearch;
