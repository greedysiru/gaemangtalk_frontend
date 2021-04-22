import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Upload from '../components/Upload';
import { Button, Text, Wrapper } from '../elements';
import { userActions } from '../redux/modules/user';
import { BiPencil as Penceil } from 'react-icons/bi';
import useInput from '../shared/useInput';
import ErrorMsg from '../elements/ErrorMsg';
import { utilActions } from '../redux/modules/util';
import { testUsernameValid } from '../shared/common';

// 사용자 정보 수정 페이지
const UserInfo = (props) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false); // user name 변경 상태
  const userInfo = useSelector((state) => state.user.userInfo); // store의 유저 정보
  const loginError = useSelector((state) => state.user.loginError); // store의 유저 정보
  const [value, setValue, onChangeValue] = useInput(userInfo?.username); // useranme 입력 값
  const usernameInput = useRef(); // username input ref!!
  const preview = useSelector((state) => state.util.preview); // 이미지 등록 후 s3에 저장한 url

  const [usernameValidError, setUsernameValidError] = useState(false);
  const [vaildMsg, setVaildMsg] = useState('');

  useEffect(() => {
    if (userInfo) {
      resetUserInfo();
    }
  }, [userInfo]);

  // 수정상태로 변경하고, input에 커서들어가게끔
  const onEdit = () => {
    setIsEdit(true);

    // 화면에 나타나기 전에는 focus가 안되므로 setTimeout으로 시간차를 줌
    setTimeout(() => {
      if (usernameInput.current) {
        usernameInput.current.focus();
      }
    }, 0);
  };

  // 저장버튼
  const onUpdateProfile = () => {
    if (value.length < 3 || value.length > 10) {
      setUsernameValidError(true);
      setVaildMsg('3-10자로 입력해주세요');
      return;
    }

    if (!testUsernameValid(value)) {
      setUsernameValidError(true);
      setVaildMsg('한글, 영어, 숫자, -, _만 입력해주세요');
      return;
    }

    setVaildMsg(false);

    const data = {
      profileUrl: preview,
      username: value
    };
    // profile url과 username
    dispatch(userActions.updateUserProfile(userInfo.id, data));
  };
  // 취소버튼 눌렀을 때
  const resetUserInfo = () => {
    setValue(userInfo.username);
    dispatch(utilActions.setPreview(userInfo.profileUrl));
  };

  const onClickUserContainer = (e) => {
    if (!isEdit) return;
    if (e.target.id !== 'usernameInput') {
      setIsEdit(false);
    }
  };
  return (
    <Container onClick={onClickUserContainer}>
      <InnerWrapper>
        <Title>내 정보</Title>
        <Wrapper>
          <Upload img={userInfo?.profileUrl} />
        </Wrapper>
        <Line>
          <Text>Email</Text>
          <div className="under">
            {userInfo?.email}{' '}
            {userInfo?.kakaoId && <IsKakao src="isKakao.png" />}
          </div>
        </Line>
        <Line>
          <Text>이름</Text>
          <div className="under" onClick={onEdit}>
            {isEdit ? (
              <Input
                id="usernameInput"
                ref={usernameInput}
                type="text"
                onChange={onChangeValue}
                value={value}
              />
            ) : (
              <span> {value}</span>
            )}

            <Penceil className="icon" />
          </div>
        </Line>
        <ErrorMsg valid={usernameValidError}>{vaildMsg}</ErrorMsg>
        <ErrorMsg valid={loginError}>{loginError}</ErrorMsg>
        <Wrapper margin="0.5rem 0">
          <Button disabled={!value} _onClick={onUpdateProfile}>
            저장
          </Button>
        </Wrapper>
        <Wrapper margin="0.5rem 0">
          <Button _onClick={resetUserInfo}>취소</Button>
        </Wrapper>
      </InnerWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex_row};
  justify-content: center;
`;
const InnerWrapper = styled.div`
  ${(props) => props.theme.flex_column};
  padding: 1rem;
  width: 300px;
`;

const Line = styled.div`
  margin: 1rem;
  width: 100%;

  & .under {
    width: 100%;
    margin: 10px 0;
    padding-bottom: 10px;
    border-bottom: 2px dashed ${(props) => props.theme.main_color};
    cursor: pointer;
    ${(props) => props.theme.flex_row};

    &:hover {
      & .icon {
        background-color: ${(props) => props.theme.main_color};
        color: ${(props) => props.theme.theme_gray};
      }
    }

    & .icon {
      color: gray;
      cursor: pointer;
      transition: 0.2s;
      border-radius: 50%;
      padding: 2px;
    }
  }
`;

const Title = styled.span`
  margin: 2rem;
  font-weight: 800;
  font-size: 1.5rem;
`;

const Input = styled.input`
  border: none;
  background-color: ${(props) => props.theme.main_color_blur};
  width: 100%;
`;

const IsKakao = styled.img`
  width: 20px;
`;
export default UserInfo;
