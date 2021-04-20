import { createReducer, createAction } from '@reduxjs/toolkit';
import { utilAPI } from '../../shared/api';

// initialState
const initialState = {
  image_url: '',
  uploading: false,
  preview: null
};

// action
const uploading = createAction('util/UPLOADING');
//const uploadImage = createAction('util/UPLOAD_IMAGE');
const setPreview = createAction('util/SET_PREVIEW');

// middleware actions
const uploadImage = (userId, image) => async (
  dispatch,
  getState,
  { history }
) => {
  try {
    dispatch(uploading(true));
    console.log('uploadImage', image);
    const res = await utilAPI.uploadImage(userId, image);
    console.log(res);
    dispatch(uploading(false));
  } catch (error) {
    console.error(error);
  }
};

// reducer
const util = createReducer(initialState, {
  [uploading]: (state, { payload }) => {
    state.uploading = payload;
  }
});

// action creator export
export const utilActions = {
  uploadImage
};

export default util;
