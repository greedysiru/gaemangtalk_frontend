import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Text, Wrapper } from '../elements';
import InputValid from '../elements/InputValid';
import { userActions } from '../redux/modules/user';
import {
  testEmailValid,
  testPwValid,
  testRepatNumber,
  testUsernameValid
} from '../shared/common';

const Signup = (props) => {
  const dispatch = useDispatch();

  // input 입력 값
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  // email validation
  const [isOpenEmailValid, setIsOpenEmailValid] = useState(false);
  const [isStartEmailInput, setIsStartEmailInput] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidEmailChk, setIsValidEmailChk] = useState(false);
  const isValidEmailMultiple = useSelector(
    (state) => state.user.isValidEmailMultiple
  );

  // username validation
  const [isOpenUsernameValid, setIsOpenUsernameValid] = useState(false);
  const [isStartUsernameInput, setIsStartUsernameInput] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidUsernameLength, setIsValidUsernameLength] = useState(false);

  // passwrod validation
  const [isOpenPasswordValid, setIsOpenPasswordValid] = useState(false);
  const [isStartPasswordInput, setIsStartPasswordInput] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPasswordRepeat, setIsValidPasswordRepeat] = useState(false);

  // password check validation
  const [isOpenPwChkValid, setIsOpenPwChkValid] = useState(false);

  // 회원가입 버튼
  const onClickSignup = () => {
    if (!checkTotalvalidation()) return alert('입력요건을 지켜주세요');

    const data = {
      username,
      email,
      password
    };

    dispatch(userActions.signup(data));
  };

  // 이메일 중복체크 버튼 이벤트
  const onClickMultipleChk = () => {
    dispatch(userActions.emailCheck(email));
    setIsValidEmailChk(true);
  };

  // 이메일 입력 - email 형식 체크, 형식 validation 초기화
  const onChangeEmail = (e) => {
    if (!isStartEmailInput) setIsStartEmailInput(true);

    setEmail(e.target.value);

    if (isValidEmailMultiple) {
      dispatch(userActions.setIsValidEmailMultiple(false));
    }

    setIsValidEmail(testEmailValid(e.target.value));
  };

  // username 입력
  const onChangeUsername = (e) => {
    // validation 색깔 바꾸기 용
    if (!isStartUsernameInput) setIsStartUsernameInput(true);

    setUsername(e.target.value);

    // 영어 숫자 한글 - _ 만 입력가능
    setIsValidUsername(testUsernameValid(e.target.value));
    //e.target.value = e.target.value.replace(/[^가-힣A-Za-z0-9-_]/gi, '');

    // username 길이 체크
    setIsValidUsernameLength(
      e.target.value.length >= 3 && e.target.value.length <= 20
    );
  };

  // password 입력
  const onChangePassword = (e) => {
    if (!isStartPasswordInput) setIsStartPasswordInput(true);

    setPassword(e.target.value);
    setIsValidPassword(testPwValid(e.target.value));
    setIsValidPasswordRepeat(testRepatNumber(e.target.value));
  };

  const checkTotalvalidation = () => {
    let passEmail = email && isValidEmail && isValidEmailMultiple;
    let passUsername = username && isValidUsername;
    let passPw =
      password &&
      isValidPassword &&
      isValidPasswordRepeat &&
      password === passwordCheck;

    return passEmail && passUsername && passPw;
  };
  return (
    <Container>
      <Title>회원가입</Title>
      <Table>
        <tbody>
          <tr>
            <th>
              <Text>이메일</Text>
            </th>
            <td className="input">
              <Input
                onChange={onChangeEmail}
                onFocus={() => setIsOpenEmailValid(true)}
                placeholder="이메일을 입력해주세요"
              ></Input>
              <ValidWrapper isOpen={isOpenEmailValid}>
                <InputValid isStart={isStartEmailInput} isValid={isValidEmail}>
                  이메일 형식
                </InputValid>
                <InputValid
                  isStart={isValidEmailChk}
                  isValid={isValidEmailMultiple}
                >
                  아이디 중복확인
                </InputValid>
              </ValidWrapper>
            </td>
            <td>
              <Button
                _onClick={onClickMultipleChk}
                disabled={!isValidEmail}
                padding="8px"
                width="100px"
              >
                중복확인
              </Button>
            </td>
          </tr>

          <tr>
            <th>
              <Text>이름 *</Text>
            </th>
            <td className="input">
              <Input
                onFocus={() => setIsOpenUsernameValid(true)}
                onChange={onChangeUsername}
                placeholder="3~20자리의 숫자, 영어, 한글, -,_만 가능합니다."
              ></Input>
              <ValidWrapper isOpen={isOpenUsernameValid}>
                <InputValid
                  isStart={isStartUsernameInput}
                  isValid={isValidUsername}
                >
                  한글,영어,숫자, -, _만 허용
                </InputValid>
              </ValidWrapper>
              <ValidWrapper isOpen={isOpenUsernameValid}>
                <InputValid
                  isStart={isStartUsernameInput}
                  isValid={isValidUsernameLength}
                >
                  3~20자리
                </InputValid>
              </ValidWrapper>
            </td>
          </tr>

          <tr>
            <th>
              <Text>비밀번호 *</Text>
            </th>
            <td className="input">
              <Input
                onFocus={() => setIsOpenPasswordValid(true)}
                type="password"
                onChange={onChangePassword}
                placeholder="비밀번호를 입력해주세요"
              ></Input>
              <ValidWrapper isOpen={isOpenPasswordValid}>
                <InputValid
                  isStart={isStartPasswordInput}
                  isValid={password.length >= 10}
                >
                  10자리 이상 입력
                </InputValid>
                <InputValid
                  isStart={isStartPasswordInput}
                  isValid={isValidUsername}
                >
                  영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
                </InputValid>
                <InputValid
                  isStart={isStartPasswordInput}
                  isValid={isValidPasswordRepeat}
                >
                  동일한 숫자 3개 이상 연속 사용 불가
                </InputValid>
              </ValidWrapper>
            </td>
          </tr>

          <tr>
            <th>
              <Text>비밀번호 확인*</Text>
            </th>
            <td className="input">
              <Input
                type="password"
                onFocus={() => {
                  if (!isOpenPwChkValid) setIsOpenPwChkValid(true);
                }}
                onChange={(e) => setPasswordCheck(e.target.value)}
                placeholder="비밀번호를 한번 더 입력해주세요"
              ></Input>
              <ValidWrapper isOpen={isOpenPwChkValid}>
                <InputValid
                  isStart={isStartPasswordInput}
                  isValid={passwordCheck && password === passwordCheck}
                >
                  동일한 비밀번호를 입력해주세요
                </InputValid>
              </ValidWrapper>
            </td>
          </tr>
        </tbody>
      </Table>
      <Wrapper width="200px">
        <Wrapper margin="0.5rem">
          <Button _onClick={() => props.history.push('/')}>취소</Button>
        </Wrapper>
        <Wrapper margin="0.5rem">
          <Button
            _onClick={onClickSignup}
            disabled={!email || !username || !password || !passwordCheck}
          >
            회원가입
          </Button>
        </Wrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  ${(props) => props.theme.flex_column};
  align-items: center;
  justify-content: center;


`;

const Input = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;
const Table = styled.table`
  & th {
    text-align: left;
  }
  & td {
    padding: 0.5rem;
  }
  & td.input {
    width: 300px;
  }
  @media ${(props) => props.theme.mobile} {
    & tr{
      ${(props) => props.theme.flex_column};
      align-items: flex-start;
      justify-content: center;
    }
    & th{
      margin-left:8px;
    }
    & td {
      width: 95%;
      text-align: right;
    }
  }
`;

const ValidWrapper = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  padding-top: 0.5em;
`;

const Title = styled.span`
  margin: 2rem;
  font-weight: 800;
  font-size: 1.5rem;
`;
export default Signup;
