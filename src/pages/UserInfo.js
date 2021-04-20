import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Upload from '../components/Upload';
import { Button, Text, Wrapper } from '../elements';
import { userActions } from '../redux/modules/user';
import { BiPencil as Penceil } from 'react-icons/bi';
import useInput from '../shared/useInput';

const UserInfo = (props) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue, onChangeValue] = useInput('');
  /* 
  useEffect(() => {
    window.addEventListener('click', () => {
      setIsEdit(false);
    });

    return () => {
      window.removeEventListener('click', () => {
        setIsEdit(false);
      });
    };
  }); */
  //const userInfo = useSelector((state) => state.user.userInfo);
  const userInfo = { email: 'sorbur02@naver.com', username: '나다나다나단다' };
  return (
    <Container>
      <Title>내 정보</Title>
      <Wrapper>
        <Upload img={userInfo?.profileUrl} />
      </Wrapper>
      <Line>
        <Text>Email</Text>
        <div className="under">{userInfo?.email}</div>
      </Line>
      <Line>
        <Text>이름</Text>
        <div className="under">
          {isEdit ? <Input type="text" /> : <span> {userInfo?.username}</span>}

          <Penceil className="icon" onClick={() => setIsEdit(!isEdit)} />
        </div>
      </Line>
      <Button>저장</Button>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  ${(props) => props.theme.flex_column};
  padding: 1rem;
`;

const Profile = styled.img`
  width: 300px;
  height: 300px;
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
  //border: none;
`;
export default UserInfo;
