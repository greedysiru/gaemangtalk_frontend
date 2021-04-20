import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { userAPI } from '../../shared/api';

export const initialState = {
  userInfo: null,
  isValidEmailMultiple: false,
  loginError: null,
  authNumber: '',
  is_login: false
};

const login = createAction('user/LOGIN');
const logout = createAction('user/LOGOUT');
const setLoginError = createAction('user/SET_LOGIN_ERROR');
const setIsValidEmailMultiple = createAction(
  'user/SET_IS_VALID_EMAIL_MULTIPLE'
);
const setAuthNumber = createAction('user/SET_AUTH_NUMBER');
// 로그인 / 로그아웃 시 is_login을 바꾸는 액션

const user = createReducer(initialState, {
  [login]: (state, { payload }) => {
    state.userInfo = payload;
    state.is_login = true;
  },
  [logout]: (state, { payload }) => {
    deleteCookie('access-token');
    deleteCookie('username');
    deleteCookie('email');
    deleteCookie('userId');

    axios.defaults.headers.common['token'] = ``;

    state.userInfo = null;
    state.is_login = false;
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
    const res = await userAPI.signup(data);
    console.log(res);
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

const fetchLogin = (data) => async (dispatch, getState, { history }) => {
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

    dispatch(fetchUserProfile(1));
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

const loginByKakao = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.loginByKakao(data);

    const token = res.data.token;
    const username = res.data.username;
    const userId = res.data.userid;

    setCookie('access-token', token);
    setCookie('username', username);
    setCookie('userId', userId);

    axios.defaults.headers.common['token'] = `${token}`;
    dispatch(fetchUserProfile(1));
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

const fetchUserProfile = (type = 0) => async (
  dispatch,
  getState,
  { history }
) => {
  try {
    const res = await userAPI.getUserProfile();
    dispatch(login(res.data));

    // 로그인시 페이지이동
    if (type === 1) {
      history.push('/chat');
    }
  } catch (error) {
    console.error(error);
  }
};

export const userActions = {
  signup,
  emailCheck,
  setIsValidEmailMultiple,
  fetchLogin,
  login,
  logout,
  setLoginError,
  findPassword,
  setAuthNumber,
  updatePassword,
  loginByKakao,
  fetchUserProfile
};

export default user;
