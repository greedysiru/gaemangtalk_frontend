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
const clearCategory = createAction('chat/clearCategory');

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
  }
});


// thunk
// 채팅방 생성
// const createRoom = (data, closePopup) => {
//   return function (dispatch, getState, { history }) {
//     axios.post(`/api/chat/rooms`, data)
//       .then((res) => {
//         // 채팅방 리스트 다시 가져오기
//         console.log(res)
//         window.alert('채팅방이 생성되었습니다.')
//         dispatch(getChatList());
//         closePopup();
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//       ;
//   };
// };

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
// const getChatList = () => {
//   return function (dispatch, getState, { history }) {
//     axios.get(`/api/chat/rooms`)
//       .then((res) => {
//         dispatch(getChat(res.data));
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//       ;
//   };
// };

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

// web socket
// 채팅방 입장
// connect, subscribe
// const enterChatRoom = () => {
//   return function (dispatch, getState, { history }) {
//     const token = getCookie('access-token');
//     let sock = new SockJS("http://54.180.141.91:8080/chatting");
//     let ws = Stomp.over(sock);
//     const roomId = getState().chat.currentChat.roomId
//     ws.connect({
//       'token': token,
//       // 'Access-Control-Allow-Origin': '*://*',
//       // 'Access-Control-Allow-Methods': '*',
//     }
//       , () => {
//         ws.subscribe(`/sub/api/chat/rooms/${roomId}`, (data) => {
//           const newMessage = JSON.parse(data.body);
//           dispatch(getMessages(newMessage))
//         });
//       }
//     );

//   }
// }

// send
// const sendMessage = () => {
//   return function (dispatch, getState, { history }) {
//     let sock = new SockJS("http://54.180.141.91:8080/chatting");
//     let ws = Stomp.over(sock);
//     const token = getCookie('access-token');
//     const sender = getCookie('username');
//     const roomId = getState().chat.currentChat.roomId;

//     const messageText = getState().chat.messageText;
//     // 보낼 데이터
//     const messageData = {
//       'type': 'TALK',
//       'roomId': roomId,
//       'sender': sender,
//       'message': messageText,
//       'senderEmail': null,
//     }

//     ws.send('/pub/api/chat/message', { 'token': token, }, JSON.stringify(messageData))

//   }

// }

// DB에 존재하는 채팅방 메시지들 가져오기
// const getChatMessages = () => {
//   return function (dispatch, getState, { history }) {
//     const roomId = getState().chat.currentChat.roomId;
//     axios.get(`/api/chat/rooms/${roomId}/messages`)
//       .then((res) => {
//         const chatMessagesArray = res.data.content;
//         dispatch(setMessages(chatMessagesArray));
//       })
//       .catch((err) => {
//         console.log(err)
//       });
//   };
// };

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

// // 스크롤 아래 이동
// const moveScrollBottom = () => {
//   return function (dispatch, getState, { history }) {
//     // 메세지리스트 요소 가져오기
//     const MessageListElement = document.getElementById('messagelist');
//     // 요소가 없으면 바로 리턴
//     if (!MessageListElement) {
//       return
//     }
//     // 메세지리스트 길이
//     const MessageListElementHeight = MessageListElement.scrollHeight;
//     // 아래로 이동
//     MessageListElement.scroll({ top: MessageListElementHeight, left: 0, behavior: 'smooth' });

//   }
// }

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
  getChat
};

export default chat;