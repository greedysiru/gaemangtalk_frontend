import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://54.180.141.91:8080';
//axios.defaults.withCredentials = true;

export const initialState = {
  userInfo: [],
  isValidEmailMultiple: false
};

const login = createAction('user/LOGIN');
const setIsValidEmailMultiple = createAction(
  'user/SET_IS_VALID_EMAIL_MULTIPLE'
);

const user = createReducer(initialState, {
  [login]: (state, { payload }) => {
    console.log('ㅎㅎㅎ');
  },
  [setIsValidEmailMultiple]: (state, { payload }) => {
    state.isValidEmailMultiple = payload;
  }
});

// thunk
const signup = (data) => {
  return function (dispatch, getState, { history }) {
    console.log(data);

    axios
      .post(`/api/user/signup`, data)
      .then((res) => {
        alert('회원가입이 완료되었습니다');
        history.push('/login');
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.errorMessage);
      });
  };
};

const emailCheck = (email) => {
  console.log('email check');
  return function (dispatch, getState, { history }) {
    axios
      .post(`/api/user/signup/emailCheck`, { email })
      .then((res) => {
        alert('사용 가능한 이메일입니다');
        dispatch(setIsValidEmailMultiple(true));
      })
      .catch((err) => {
        alert('이미 사용중인 이메일입니다');
      });
  };
};

export const userActions = {
  signup,
  emailCheck,
  setIsValidEmailMultiple
};

export default user;
