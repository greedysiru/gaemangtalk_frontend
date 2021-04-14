import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Text, Wrapper } from '../elements';
import useInput from '../shared/useInput';

const PasswordSearch = ({ history }) => {
  // status : input(이메일입력) -> auth(인증) -> update(변경)
  const [status, setStatus] = useState('input');

  const [searchId, setSearchId, onChangeSearchId] = useInput('');

  const sendEmail = () => {
    console.log(searchId);
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
      <InnerWrapper>
        {status === 'input' && (
          <Wrapper is_column>
            <Input
              _onChange={onChangeSearchId}
              placeholder="이메일을 입력해주세요"
            ></Input>
            <ButtonWapper>
              <Button _onClick={goBack}>취소</Button>
              <Button _onClick={sendEmail}>찾기</Button>
            </ButtonWapper>
          </Wrapper>
        )}
        {status === 'auth' && (
          <Wrapper is_column>
            <Input
              _onChange={onChangeSearchId}
              placeholder="인증번호를 입력해주세요"
            ></Input>
            <ButtonWapper>
              <Button _onClick={goBack}>이전단계</Button>
              <Button _onClick={onAuth}>인증</Button>
            </ButtonWapper>
          </Wrapper>
        )}
        {status === 'update' && (
          <Wrapper is_column>
            <Input
              _onChange={onChangeSearchId}
              placeholder="변경할 비밀번호를 입력해주세요"
            ></Input>
            <Input
              _onChange={onChangeSearchId}
              placeholder="동일한 비밀번호를 입력해주세요"
            ></Input>
            <ButtonWapper>
              <Button _onClick={goBack}>이전단계</Button>
              <Button _onClick={updatePassword}>변경하기</Button>
            </ButtonWapper>
          </Wrapper>
        )}
      </InnerWrapper>
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

const InnerWrapper = styled.div`
  background-color: yellow;
  ${(props) => props.theme.flex_row};
`;

const ButtonWapper = styled.div`
  width: 100%;
  margin: 0.5rem 0;

  display: flex;
  justify-content: space-between;
`;
export default PasswordSearch;
