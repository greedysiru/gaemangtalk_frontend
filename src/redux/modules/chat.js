import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://54.180.141.91:8080';

export const initialState = {
  // 채팅 리스트를 받는 배열
  chatInfo: []
};

// 채팅 리스트를 다루는 액션
const getChat = createAction('chat/GETCHAT');


const chat = createReducer(initialState, {
  [getChat]: (state, action) => {
    state.chatInfo = action.payload;
  }
});


// thunk
// 채팅방 생성
const createRoom = (data, closePopup) => {
  return function (dispatch, getState, { history }) {
    axios.post(`/api/chat/rooms`, data)
      .then((res) => {
        // 채팅방 리스트 다시 가져오기
        console.log(res)
        window.alert('채팅방이 생성되었습니다.')
        dispatch(getChatList());
        closePopup();
      })
      .catch((err) => {
        console.log(err)
      })
      ;
  };
};

// 채팅방 목록 조회
const getChatList = () => {
  return function (dispatch, getState, { history }) {
    axios.get(`/api/chat/rooms`)
      .then((res) => {
        dispatch(getChat(res.data));
      })
      .catch((err) => {
        console.log(err)
      })
      ;
  };
};



export const chatActions = {
  createRoom,
  getChatList,
};

export default chat;