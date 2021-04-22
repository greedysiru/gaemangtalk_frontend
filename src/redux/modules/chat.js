import { createReducer, createAction } from '@reduxjs/toolkit';

// api 가져오기
import { chatAPI } from '../../shared/api';

export const initialState = {
  // 채팅 리스트를 받는 배열
  chatInfo: [],
  // 현재 접속 채팅 방
  currentChat: {
    roomId: null,
    roomName: null,
    category: null,
  },
  // 현재 접속 채팅 메시지
  messages: [],
  messageText: null,
  // 메시지 현재 페이지
  messageCurPage: null,
  // 메시지 총 페이지
  messageTotalPage: null,
  // 메시지 로딩
  loading: false,
  // 사용자가 설정한 카테고리(채팅방 생성시)
  selectedCategory: [],
};

// 채팅 리스트를 다루는 액션
const getChat = createAction('chat/GETCHAT');
// 채팅방을 옮기는 액션
const moveChat = createAction('chat/MOVECHAT');
// 채팅방의 대화 내용을 가져오기
const getMessages = createAction('chat/GETMESSAGES');
// 사용자가 입력한 메시지의 텍스트를 기록
const writeMessage = createAction('chat/WRITEMESSAGE');
// 저장한 대화 내용을 없애기
const clearMessages = createAction('chat/CLEARMESSAGES');
// DB의 채팅방의 대화 내용을 넣어놓기
const setMessages = createAction('chat/SETMESSAGES');
// 로딩을 다루는 액션
const isLoading = createAction('chat/ISLOADING');
// 로딩 완료 액션
const isLoaded = createAction('chat/ISLOADED');
// 입장한 채팅방 정보를 없애기
const clearCurrentChat = createAction('chat/CLEARCURRENTCHAT');
// 카테고리 설정
const setCategory = createAction('chat/SETCATEGORY');
// 카테고리 초기화
const clearCategory = createAction('chat/CELARCATEGORY');
// 카테고리 삭제
const deleteCategory = createAction('chat/DELETECATEGORY');

const chat = createReducer(initialState, {
  [getChat]: (state, action) => {
    state.chatInfo = action.payload;
  },
  [moveChat]: (state, action) => {
    state.currentChat = action.payload;
  },
  [getMessages]: (state, action) => {
    state.messages.push(action.payload);
    state.loading = true;
  },
  [writeMessage]: (state, action) => {
    state.messageText = action.payload;
  },
  [clearMessages]: (state, action) => {
    state.messages = [];
  },
  [setMessages]: (state, action) => {
    state.messages = action.payload
  },
  [isLoading]: (state, action) => {
    state.loading = false;
  },
  [isLoaded]: (state, action) => {
    state.loading = true;
  },
  [clearCurrentChat]: (state, action) => {
    state.currentChat.roomId = null;
    state.currentChat.roomName = null;
  },
  [setCategory]: (state, action) => {
    state.selectedCategory.push(action.payload);
  },
  [clearCategory]: (state, action) => {
    state.selectedCategory = [];
  },
  [deleteCategory]: (state, action) => {
    state.selectedCategory.splice(state.selectedCategory.indexOf(action.payload), 1);
  }
});


const createRoom = (data, closePopup) => async (dispatch, getState, { history }) => {
  try {
    const res = await chatAPI.createRoom(data);
    window.alert('채팅방이 생성되었습니다.')
    dispatch(getChatList());
    closePopup();
  }
  catch (error) {
    console.log(error);
  }
};

// 채팅방 목록 조회
const getChatList = () => async (dispatch, getState, { history }) => {
  try {
    const res = await chatAPI.getChatList();
    dispatch(getChat(res.data));
  }
  catch (error) {
    console.log(error);
  }
};

// DB에 존재하는 채팅방 메시지들 가져오기
const getChatMessages = () => async (dispatch, getState, { history }) => {
  try {
    const roomId = getState().chat.currentChat.roomId;
    const res = await chatAPI.getChatMessages(roomId);
    const chatMessagesArray = res.data.content;
    dispatch(setMessages(chatMessagesArray));
  }
  catch (error) {
    console.log(error);
  }
};


export const chatActions = {
  createRoom,
  getChatList,
  moveChat,
  getMessages,
  writeMessage,
  clearMessages,
  getChatMessages,
  isLoading,
  isLoaded,
  clearCurrentChat,
  setCategory,
  clearCategory,
  getChat,
  deleteCategory
};

export default chat;