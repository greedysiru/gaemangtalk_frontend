import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Text, Wrapper } from '../elements';
import InputValid from '../elements/InputValid';
import { userActions } from '../redux/modules/user';

const Signup = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [isOpenEmailValid, setIsOpenEmailValid] = useState(false);
  const [isStartEmail, setIsStartEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidEmailChk, setIsValidEmailChk] = useState(false);
  const isValidEmailMultiple = useSelector(
    (state) => state.user.isValidEmailMultiple
  );

  const [isOpenUsernameValid, setIsOpenUsernameValid] = useState(false);

  const [isOpenPwValid, setIsOpenPwValid] = useState(false);

  const [isOpenPwChkValid, setIsOpenPwChkValid] = useState(false);

  const onClickSignup = () => {
    if (!email || !username || !password || !passwordCheck) return;
    console.log(email, username, password, passwordCheck);
    const data = {
      username,
      email,
      password
    };

    dispatch(userActions.signup(data));
  };

  const onClickMultipleChk = () => {
    dispatch(userActions.emailCheck(email));
    setIsValidEmailChk(true);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setIsStartEmail(true);

    if (isValidEmailMultiple) {
      dispatch(userActions.setIsValidEmailMultiple(false));
    }

    let _reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    setIsValidEmail(_reg.test(email));
  };
  return (
    <Container>
      <Text>회원가입</Text>
      <Table>
        <tbody>
          <tr>
            <th>
              <Text>이메일*</Text>
            </th>
            <td>
              <Input
                onChange={onChangeEmail}
                onClick={() => setIsOpenEmailValid(true)}
                placeholder="이메일을 입력해주세요"
              ></Input>
              <ValidWrapper isOpen={isOpenEmailValid}>
                <InputValid isStart={isStartEmail} isValid={isValidEmail}>
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
              <Button _onClick={onClickMultipleChk} disabled={!isValidEmail}>
                중복확인
              </Button>
            </td>
          </tr>

          <tr>
            <th>
              <Text>이름 *</Text>
            </th>
            <td>
              <Input
                /* onChange={onChangeUsername} */
                placeholder="3~20자리의 숫자 또는 문자만 가능합니다."
              ></Input>
            </td>
          </tr>

          <tr>
            <th>
              <Text>비밀번호 *</Text>
            </th>
            <td>
              <Input
                type="password"
                /* onChange={onChangePassword} */
                placeholder="비밀번호를 입력해주세요"
              ></Input>
            </td>
          </tr>

          <tr>
            <th>
              <Text>비밀번호 확인*</Text>
            </th>
            <td>
              <Input
                type="password"
                /* onChange={onChangePasswordCheck} */
                placeholder="비밀번호를 한번 더 입력해주세요"
              ></Input>
            </td>
          </tr>
        </tbody>
      </Table>
      <Wrapper>
        <Button _onClick={() => props.history.push('/')}>취소</Button>
        <Button _onClick={onClickSignup}>회원가입</Button>
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
const Table = styled.table``;

const ValidWrapper = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;
export default Signup;
