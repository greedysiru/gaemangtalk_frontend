import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookie } from '../../shared/cookie';
import { userAPI } from '../../shared/api';

export const initialState = {
  userInfo: null,
  isValidEmailMultiple: false,
  loginError: null,
  authNumber: ''
};

const setUser = createAction('user/SET_USER');
const setLoginError = createAction('user/SET_LOGIN_ERROR');
const setIsValidEmailMultiple = createAction(
  'user/SET_IS_VALID_EMAIL_MULTIPLE'
);
const setAuthNumber = createAction('user/SET_AUTH_NUMBER');
const logout = createAction('user/LOGOUT');

const user = createReducer(initialState, {
  [setUser]: (state, { payload }) => {
    state.userInfo = payload;
  },
  [logout]: (state, { payload }) => {
    state.userInfo = null;
  },
  [setIsValidEmailMultiple]: (state, { payload }) => {
    state.isValidEmailMultiple = payload;
  },
  [setLoginError]: (state, { payload }) => {
    state.loginError = payload;
  },
  [setAuthNumber]: (state, { payload }) => {
    state.authNumber = payload;
  }
});

// thunk
const signup = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.signup;
    alert('회원가입이 완료되었습니다');
    history.push('/');
  } catch (error) {
    console.log(error.response);
    alert(error.response.data.errorMessage);
  }
};

const emailCheck = (email) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.emailCheck({ email });
    alert('사용 가능한 이메일입니다');
    dispatch(setIsValidEmailMultiple(true));
  } catch (error) {
    alert('이미 사용중인 이메일입니다');
  }
};

const login = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.login(data);

    const token = res.data.token;
    const username = res.data.username;
    const userId = res.data.userid;

    setCookie('access-token', token);
    setCookie('username', username);
    setCookie('userId', userId);
    setCookie('email', data.email);
    axios.defaults.headers.common['token'] = `${token}`;

    dispatch(setUser(res.data));
    history.push('/chat');
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

const loginByKakao = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.loginByKakao(data);
    console.log('카카오로그인', res);
    const token = res.data.token;
    const username = res.data.username;
    const userId = res.data.userid;

    setCookie('access-token', token);
    setCookie('username', username);
    setCookie('userId', userId);
    setCookie('email', data.email);
    axios.defaults.headers.common['token'] = `${token}`;

    dispatch(setUser(res.data));
    history.push('/chat');
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

const findPassword = (email) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.findPassword({ email });
    dispatch(setAuthNumber(res.data.CertificationNumber));
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.updatePassword(data);
    alert('비밀번호를 변경했습니다');
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const userActions = {
  signup,
  emailCheck,
  setIsValidEmailMultiple,
  login,
  logout,
  setLoginError,
  findPassword,
  setAuthNumber,
  updatePassword,
  setUser,
  loginByKakao
};

export default user;
