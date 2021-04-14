import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// 소켓 통신
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// 쿠키
import { getCookie } from '../../shared/cookie';


axios.defaults.baseURL = 'http://54.180.141.91:8080';

export const initialState = {
  // 채팅 리스트를 받는 배열
  chatInfo: [],
  // 현재 접속 채팅 방
  currentChat: {
    roomId: null,
    roomName: null,
  },
  // 현재 접속 채팅 메시지
  messages: []
};

// 채팅 리스트를 다루는 액션
const getChat = createAction('chat/GETCHAT');
// 채팅방을 옮기는 액션
const moveChat = createAction('chat/MOVECHAT');
// 채팅방의 대화 내용을 가져오기
const getMessages = createAction('chat/GETMESSAGES');


const chat = createReducer(initialState, {
  [getChat]: (state, action) => {
    state.chatInfo = action.payload;
  },
  [moveChat]: (state, action) => {
    state.currentChat = action.payload;
  },
  [getMessages]: (state, action) => {
    state.messages.unshift(action.payload);
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

// web socket
const enterChatRoom = (roomId) => {
  return function (dispatch, getState, { history }) {
    const token = getCookie('access-token');
    let sock = new SockJS("http://54.180.141.91:8080/chatting");
    let ws = Stomp.over(sock);
    ws.connect({
      'token': token,
      // 'Access-Control-Allow-Origin': '*://*',
      // 'Access-Control-Allow-Methods': '*',
    }
      , () => {
        ws.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
          const newMessage = JSON.parse(data.body);
          dispatch(getMessages(newMessage))
        });
      }
    );

  }
}


export const chatActions = {
  createRoom,
  getChatList,
  moveChat,
  getMessages,
  enterChatRoom,
};

export default chat;