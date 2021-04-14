import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookie } from '../../shared/cookie';

axios.defaults.baseURL = 'http://54.180.141.91:8080';

export const initialState = {
  username: null,
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
const user = createReducer(initialState, {
  [setUser]: (state, { payload }) => {
    state.username = payload;
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
const signup = (data) => {
  return function (dispatch, getState, { history }) {
    console.log(data);

    axios
      .post(`/api/user/signup`, data)
      .then((res) => {
        alert('회원가입이 완료되었습니다');
        history.push('/');
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.errorMessage);
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

const login = (data) => {
  return function (dispatch, getState, { history }) {
    axios
      .post('/api/user/login', data)
      .then((res) => {
        const token = res.data.token;
        const username = res.data.username;

        setCookie('access-token', token);
        setCookie('username', username);
        axios.defaults.headers.common['token'] = `${token}`;

        dispatch(setUser(username));
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
        dispatch(setLoginError(err.response.data.errorMessage));
      });
  };
};

const getUserInfo = () => {
  return function (dispatch, getState, { history }) {
    axios
      .get('/api/users')
      .then((res) => {
        console.log('getUserInfo', res);
        /* dispatch(
        setUser({ username: res.data.username, nickname: res.data.nickname })
      );
      history.replace('/'); */
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const findPassword = (email) => {
  return function (dispatch, getState, { history }) {
    axios
      .post('/api/user/findPassword', { email })
      .then((res) => {
        dispatch(setAuthNumber(res.data.CertificationNumber));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

const updatePassword = (data) => {
  return function (dispatch, getState, { history }) {
    axios
      .put('/api/user/changePassword', data)
      .then((res) => {
        alert('비밀번호를 변경했습니다');
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const userActions = {
  signup,
  emailCheck,
  setIsValidEmailMultiple,
  login,
  setLoginError,
  findPassword,
  setAuthNumber,
  updatePassword
};

export default user;
