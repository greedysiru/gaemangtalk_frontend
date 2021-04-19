import { createReducer, createAction } from '@reduxjs/toolkit';

// 헤더의 메뉴를 관리하는 모듈
export const initialState = {
  // 사용자가 활성화한 메뉴
  // 활성화 : true, 비활성화 false
  menuChat: false,
  menuInfo: false,
};

// 각 메뉴를 활성화하는 액션들
const activateChat = createAction('menu/ACTIVATECHAT');
const activateInfo = createAction('menu/ACTIVATEINFO');

const menu = createReducer(initialState, {
  [activateChat]: (state, action) => {
    state.menuChat = true;
    state.menuInfo = false;
  },
  [activateInfo]: (state, action) => {
    state.menuChat = false;
    state.menuInfo = true;
  },
});


export const menuActions = {
  activateChat,
  activateInfo,
};

export default menu;