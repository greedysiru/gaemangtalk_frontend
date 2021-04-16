import React, { useEffect } from 'react';
import styled from 'styled-components';

// 아이콘
import {
  IoChatboxOutline,
  IoChatbox,
  IoLogOutOutline,
  IoPersonOutline,
  IoPerson
} from 'react-icons/io5';
import { deleteCookie, getCookie } from '../shared/cookie';
import { useDispatch } from 'react-redux';
import { userActions } from '../redux/modules/user';

const Header = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const username = getCookie('username');
    const userId = getCookie('userId');
    if (username) {
      dispatch(userActions.setUser({ username, userId }));
    }
  }, []);

  const logout = () => {
    dispatch(userActions.logout());
  };
  return (
    <Container>
      <IconWrap>
        <IoChatboxOutline />
      </IconWrap>
      <IconWrap>
        <IoPersonOutline />
      </IconWrap>
      <IconWrap onClick={logout}>
        <IoLogOutOutline />
      </IconWrap>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.main_color};
  ${(props) => props.theme.border_box};
  width: 100%;
  height: 10%;
  padding: 1rem;

  ${(props) => props.theme.flex_row};
  justify-content: center;

  @media ${(props) => props.theme.desktop} {
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 10%;
    height: 100%;
  }
`;

const IconWrap = styled.div`
  width: 100%;
  margin: 1rem 0px;
  text-align: center;
  font-size: 2rem;
  color: ${(props) => props.theme.theme_gray};
  cursor: pointer;
`;
export default Header;
