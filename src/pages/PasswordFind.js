import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Text, Wrapper } from '../elements';
import ErrorMsg from '../elements/ErrorMsg';
import useInput from '../shared/useInput';
import { testEmailValid } from '../shared/common';
import { userActions } from '../redux/modules/user';

const PasswordSearch = ({ history }) => {
  const dispatch = useDispatch();
  const authNumber = useSelector((state) => state.user.authNumber);

  // status : input(이메일입력) -> auth(인증) -> update(변경)
  const [status, setStatus] = useState('input');
  const [isError, setIsError] = useState(null);
  const [passwordChk, setPasswordChk, onChangePasswordChk] = useInput('');
  const [email, setEmail] = useState('');
  const [value, setValue, onChangeValue] = useInput('');

  const onClickButton = () => {
    if (status === 'input') {
      handleInputStatus();
    } else if (status === 'auth') {
      handleAuthStatus();
    } else if (status === 'update') {
      handleUpdateStatus();
    }
  };

  const handleInputStatus = () => {
    dispatch(userActions.setAuthNumber(null));
    //setStatus('auth');
    if (!testEmailValid(value)) {
      return setIsError('이메일 형식으로 입력해주세요');
    }

    setEmail(value);
    setValue('');
    setIsError(null);
    dispatch(userActions.findPassword(value));
    setStatus('auth');
  };

  const handleAuthStatus = () => {
    if (value === authNumber) {
      setStatus('update');
    } else {
      setIsError('인증번호가 일치하지 않습니다');
    }
  };

  const handleUpdateStatus = () => {
    const data = { email, password: value };
    dispatch(userActions.updatePassword(data));
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
      <Wrapper height="100px">
        <Wrapper is_column>
          <Input
            value={value}
            _onChange={onChangeValue}
            placeholder={
              status === 'input'
                ? '이메일을 입력해주세요'
                : status === 'auth'
                ? '이메일로 전송된 인증번호를 입력해주세요'
                : '새 비밀번호를 입력해주세요'
            }
          ></Input>
          {status === 'update' && (
            <Wrapper margin="0.5rem 0">
              <Input
                placeholder="동일한 비밀번호를 입력해주세요"
                _onChange={onChangePasswordChk}
              ></Input>
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>
      <Wrapper margin="0.5rem 0">
        <ErrorMsg valid={isError}>{isError}</ErrorMsg>
      </Wrapper>
      <Wrapper margin="1rem 0">
        <Button _onClick={goBack}>이전단계</Button>
        <Button _onClick={onClickButton}>
          {status === 'input'
            ? '인증 메일 전송'
            : status === 'auth'
            ? '인증하기'
            : '비밀번호 변경'}
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 350px;

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
