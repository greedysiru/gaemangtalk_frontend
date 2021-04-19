import { createReducer, createAction } from '@reduxjs/toolkit';

// 헤더의 메뉴를 관리하는 모듈
export const initialState = {
  // 사용자가 활성화한 메뉴
  // 활성화 : true, 비활성화 false
  menuChat: false,
  menuInfo: false,
};

// 메뉴를 활성화하는 액션
const activateMenu = createAction('menu/ACTIVATEMENU');

const menu = createReducer(initialState, {
  [activateMenu]: (state, action) => {
    state = action.payload;
  },
});


export const menuActions = {
  activateMenu,
};

export default menu;