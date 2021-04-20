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

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const userInfo = useSelector((state) => state.user.userInfo);
  const [value, setValue, onChangeValue] = useInput(userInfo?.username);
  const usernameInput = useRef();
  const preview = useSelector((state) => state.util.preview);

  const handleOnClickOutside = (e) => {
    if (!isEdit) return;

    if (e.target.id !== 'usernameInput') {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOnClickOutside);

    return () => {
      window.removeEventListener('click', handleOnClickOutside);
    };
  });

  const onEdit = () => {
    setIsEdit(!isEdit);

    setTimeout(() => {
      if (usernameInput.current) {
        usernameInput.current.focus();
      }
    }, 0);
  };

  const onUpdateProfile = () => {
    if (!value.length) return console.log('안돼저리가');

    const data = {
      profileUrl: preview,
      username: value
    };
    dispatch(userActions.updateUserProfile(userInfo.id, data));
  };

  const resetUserInfo = () => {
    setValue(userInfo.username);
    dispatch(utilActions.setPreview(userInfo.profileUrl));
  };
  return (
    <Container>
      <Title>내 정보</Title>
      <Wrapper>
        <Upload img={userInfo?.profileUrl} />
      </Wrapper>
      <Line>
        <Text>Email</Text>
        <div className="under">
          {userInfo?.email} {userInfo?.kakaoId && <IsKakao src="isKakao.png" />}
        </div>
      </Line>
      <Line>
        <Text>이름</Text>
        <div className="under">
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

          <Penceil className="icon" onClick={onEdit} />
        </div>
      </Line>
      <Wrapper margin="0.5rem 0">
        <Button disabled={!value} _onClick={onUpdateProfile}>
          저장
        </Button>
      </Wrapper>
      <Wrapper margin="0.5rem 0">
        <Button _onClick={resetUserInfo}>취소</Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
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
    cursor: Default;
    ${(props) => props.theme.flex_row};

    & .icon {
      color: gray;
      cursor: pointer;
      transition: 0.2s;
      border-radius: 50%;
      padding: 2px;
      &:hover {
        background-color: ${(props) => props.theme.main_color_blur};
        color: ${(props) => props.theme.main_color_thick};
      }
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
