import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie, setCookie } from '../../shared/cookie';
import { userAPI } from '../../shared/api';

export const initialState = {
  userInfo: null, // user정보 - id, username, email, profile
  isValidEmailMultiple: false, // email 중복체크 결과
  loginError: null, // 로그인시 서버에러
  authNumber: '', // 비밀번호 찾기시 인증번호
  is_login: false // 로그인 상태
};

const login = createAction('user/LOGIN'); // 로그인 - user정보, 로그인상태 변경
const logout = createAction('user/LOGOUT'); // 로그아웃 액션 - 쿠키정보삭제
const setLoginError = createAction('user/SET_LOGIN_ERROR'); // 로그인 서버에러 액션
const setIsValidEmailMultiple = createAction(
  'user/SET_IS_VALID_EMAIL_MULTIPLE'
);
const setAuthNumber = createAction('user/SET_AUTH_NUMBER'); // 비밀번호 찾기 메일 인증번호

const user = createReducer(initialState, {
  [login]: (state, { payload }) => {
    state.userInfo = payload; //유저정보
    state.is_login = true; //로그인상태
  },
  [logout]: (state, { payload }) => {
    // 로그인시 쿠키에 저장한 정보 삭제
    deleteCookie('access-token');
    deleteCookie('username');
    deleteCookie('email');
    deleteCookie('userId');

    // 헤더에서 토큰삭제
    axios.defaults.headers.common['token'] = ``;
    // store에 정보 삭제, 로그인상태 변경
    state.userInfo = null;
    state.is_login = false;
  },
  [setIsValidEmailMultiple]: (state, { payload }) => {
    // 이메일 중복체크 결과 저장
    state.isValidEmailMultiple = payload;
  },
  [setLoginError]: (state, { payload }) => {
    // 로그인 서버 에러 상태 변경
    state.loginError = payload;
  },
  [setAuthNumber]: (state, { payload }) => {
    // 비밀번호 변경시 인증번호
    state.authNumber = payload;
  }
});

// thunk

// 일반 회원가입 api 호출
const signup = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.signup(data);

    alert('회원가입이 완료되었습니다');
    history.push('/');
  } catch (error) {
    console.log(error.response);
    alert(error.response.data.errorMessage);
  }
};

// 이메일 중복체크 api 호출
const emailCheck = (email) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.emailCheck({ email });
    alert('사용 가능한 이메일입니다');
    // 회원가입 페이지에서 벨리데이션 표시
    dispatch(setIsValidEmailMultiple(true));
  } catch (error) {
    alert('이미 사용중인 이메일입니다');
  }
};

// 일반 로그인
const fetchLogin = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.login(data);

    const token = res.data.token;
    const username = res.data.username;
    const userId = res.data.userid;
    // 쿠키에 정보 저장
    setCookie('access-token', token);
    setCookie('username', username);
    setCookie('userId', userId);
    setCookie('email', data.email);

    // 헤더에 토큰 저장
    axios.defaults.headers.common['token'] = `${token}`;

    // 토큰으로 유저정보 받아오는 api 호출
    dispatch(fetchUserProfile(1));
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

// 카카오 로그인
const loginByKakao = (data) => async (dispatch, getState, { history }) => {
  try {
    // 카카오 로그인으로 받아온 토큰으로 서버에서 jwt 토근을 받아옴
    const res = await userAPI.loginByKakao(data);

    const token = res.data.token;
    const username = res.data.username;
    const userId = res.data.userid;

    // 받아온정보 쿠키저장
    setCookie('access-token', token);
    setCookie('username', username);
    setCookie('userId', userId);

    // 헤더에 토큰 저장
    axios.defaults.headers.common['token'] = `${token}`;

    // 토큰으로 유저정보 받아옴
    dispatch(fetchUserProfile(1));
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

// 비밀번호 찾기
const findPassword = (email) => async (dispatch, getState, { history }) => {
  try {
    // 비밀번호 찾기 api 호출하면 인증번호가 사용자 email로 가고, response로 넘어옴
    const res = await userAPI.findPassword({ email });

    // 사용자가 입력한 인증번호와 비교하기 위해 store에 인증번호 저장
    dispatch(setAuthNumber(res.data.CertificationNumber));
  } catch (error) {
    console.error(error);
  }
};

// 비밀번호 변경
const updatePassword = (data) => async (dispatch, getState, { history }) => {
  try {
    const res = await userAPI.updatePassword(data);
    alert('비밀번호를 변경했습니다');
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

// 유저정보 수정
const updateUserProfile = (userId, data) => async (
  dispatch,
  getState,
  { history }
) => {
  try {
    const res = await userAPI.updateUserProfile(userId, data);
    alert('회원정보를 수정했습니다');
    // 수정된 정보 store에 다시 저장
    dispatch(login(res.data));
  } catch (error) {
    console.error(error);
    dispatch(setLoginError(error.response.data.errorMessage));
  }
};

// 토큰으로 user 정보 가져옴
const fetchUserProfile = (type = 0) => async (
  dispatch,
  getState,
  { history }
) => {
  try {
    const res = await userAPI.getUserProfile();
    dispatch(login(res.data));
    // 헤더에 토큰으로 유저정보 가져오는 로직
    // 로그인 유지와 로그인에서 사용

    // 첫 로그인시에 페이지이동 하기 위해 type으로 분기, type=0은 로그인 유지이므로 페이지이동 x
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
  fetchUserProfile,
  updateUserProfile
};

export default user;
