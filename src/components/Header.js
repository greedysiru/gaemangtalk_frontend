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
import { deleteCookie, getCookie } from '../shared/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../redux/modules/user';

import { menuActions } from '../redux/modules/menu';

import { chatActions } from '../redux/modules/chat';

const Header = (props) => {
  // 각 메뉴의 활성화 상태
  const { menuChat, menuInfo } = useSelector((state) => state.menu)
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
      {/* 메뉴 활성화 상태에 따른 렌더링 */}
      {menuChat ? (
        <IconWrap>
          <IoChatbox />
        </IconWrap>

      )
        :
        (
          <IconWrap
            onClick={() => {
              history.push('/chat')
              dispatch(menuActions.activateChat())
              dispatch(chatActions.clearMessages())
            }
            }
          >
            <IoChatboxOutline />
          </IconWrap>

        )}



      <IconWrap
        onClick={() => {
          history.push('/userInfo')
          dispatch(menuActions.activateInfo())
        }}>
        <IoPersonOutline />
      </IconWrap>
      <IconWrap onClick={logout}>
        <IoLogOutOutline />
      </IconWrap>
    </Container >
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
