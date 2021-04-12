import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://54.180.141.91:8080';
//axios.defaults.withCredentials = true;

export const initialState = {
  userInfo: []
};

const signUp = createAction('user/SIGN_UP');

const user = createReducer(initialState, {
  [signUp]: (state, { payload }) => {
    state.fullSchedule.push(payload);
  }
});

// thunk
const signup = (data) => {
  return function (dispatch, getState, { history }) {
    console.log(data);

    axios.post(`/api/user/signup`, data).then((res) => {
      console.log('signup res', res);
    });
  };
};

const emailCheck = (email) => {
  return function (dispatch, getState, { history }) {
    console.log(email);
    axios.post(`/api/user/signup/emailCheck`, { email }).then((res) => {
      //dispatch(setDetailPost(res.data));
      console.log('signup res', res);
    });
  };
};

export const userActions = {
  signup,
  emailCheck
};

export default user;
