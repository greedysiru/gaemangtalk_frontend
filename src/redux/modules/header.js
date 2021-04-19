import { createReducer, createAction } from '@reduxjs/toolkit';

// 헤더의 메뉴를 관리하는 모듈
export const initialState = {
  // 사용자가 활성화한 메뉴
  // 활성화 : true, 비활성화 false
  // 기본값은 채팅 메뉴 활성화
  headerChat: true,
  headerInfo: false,
};

// 각 메뉴를 활성화하는 액션들
const activateChat = createAction('header/ACTIVATECHAT');
const activateInfo = createAction('header/ACTIVATEINFO');

const header = createReducer(initialState, {
  [activateChat]: (state, action) => {
    state.headerChat = true;
    state.headerInfo = false;
  },
  [activateInfo]: (state, action) => {
    state.headerChat = false;
    state.headerInfo = true;
  },

});


export const headerActions = {
  activateChat,
  activateInfo,

};

export default header;