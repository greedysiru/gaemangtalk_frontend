import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, Input, Text, Wrapper } from '../elements';
import { userActions } from '../redux/modules/user';
import userInput from '../shared/useInput';

const Signup = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail, onChangeEmail] = userInput('');
  const [username, setUsername, onChangeUsername] = userInput('');
  const [password, setPassword, onChangePassword] = userInput('');
  const [passwordCheck, setPasswordCheck, onChangePasswordCheck] = userInput(
    ''
  );

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

  const onClickCheckPw = () => {
    dispatch(userActions.emailCheck(email));
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
                _onChange={onChangeEmail}
                placeholder="이메일을 입력해주세요"
              ></Input>
              - 이메일 형식 - 이메일 중복확인
            </td>
            <td>
              <Button _onClick={onClickCheckPw}>중복확인</Button>
            </td>
          </tr>

          <tr>
            <th>
              <Text>이름 *</Text>
            </th>
            <td>
              <Input
                _onChange={onChangeUsername}
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
                _onChange={onChangePassword}
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
                _onChange={onChangePasswordCheck}
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
  background-color: skyblue;
  width: 100%;
  height: 100%;

  ${(props) => props.theme.flex_column};
  align-items: center;
  justify-content: center;
`;

const Table = styled.table``;

export default Signup;
