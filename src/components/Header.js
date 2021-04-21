import React, { useEffect } from 'react';
import styled from 'styled-components';
import { history } from '../redux/configureStore';
// 아이콘
import {
  IoChatboxOutline,
  IoChatbox,
  IoLogOutOutline,
  IoPersonOutline,
  IoPerson,
  IoConstructOutline
} from 'react-icons/io5';
import { getCookie } from '../shared/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';

import { headerActions } from '../redux/modules/header';

import { chatActions } from '../redux/modules/chat';

const Header = (props) => {
  // 각 메뉴의 활성화 상태
  const { headerChat, headerInfo } = useSelector((state) => state.header);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.logout());
    history.push('/');
  };

  return (
    <Container>
      {/* 메뉴 활성화 상태에 따른 렌더링 */}
      {headerChat ? (
        <IconWrap>
          <IoChatbox />
        </IconWrap>
      ) : (
        <IconWrap
          onClick={() => {
            history.push('/chat');
            dispatch(headerActions.activateChat());
          }}
        >
          <IoChatboxOutline />
        </IconWrap>
      )}

      {headerInfo ? (
        <IconWrap>
          <IoPerson />
        </IconWrap>
      ) : (
        <IconWrap
          onClick={() => {
            history.push('/userInfo');
            dispatch(headerActions.activateInfo());
            dispatch(chatActions.clearMessages());
            dispatch(chatActions.clearCurrentChat());
          }}
        >
          <IoPersonOutline />
        </IconWrap>
      )}

      <IconWrap
        onClick={() => {
          dispatch(headerActions.activateChat());
          logout();
        }}
      >
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
    max-width: 100px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 10%;
    height: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    height: 8%;
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
