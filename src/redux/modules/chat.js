import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://54.180.141.91:8080';

export const initialState = {
  chatInfo: []
};


const getChat = createAction('chat/GETCHAT');

const chat = createReducer(initialState, {

});


// thunk
// 채팅방 생성
const createRoom = (data) => {
  return function (dispatch, getState, { history }) {
    console.log(data);
    axios.post(`/api/chat/rooms`, data).then((res) => {
      console.log(res)
      console.log('채팅방 생성')
    });
  };
};

// 채팅방 목록 조회
const getChatList = () => {
  return function (dispatch, getState, { history }) {
    console.log('들어옴')
    axios.get(`/api/chat/rooms`).then((res) => {
      console.log('채팅방 리스트 조회')
      console.log(res)
    });
  };
};



export const chatActions = {
  createRoom,
  getChatList,
};

export default chat;