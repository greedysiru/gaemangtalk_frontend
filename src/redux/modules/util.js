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
const setPreview = createAction('util/SET_PREVIEW');

// middleware actions
const uploadImage = (userId, image) => async (
  dispatch,
  getState,
  { history }
) => {
  try {
    dispatch(uploading(true));
    const res = await utilAPI.uploadImage(userId, image);

    dispatch(uploading(false));
    dispatch(setPreview(res.data));
  } catch (error) {
    console.error(error);
  }
};

// reducer
const util = createReducer(initialState, {
  [uploading]: (state, { payload }) => {
    state.uploading = payload;
  },
  [setPreview]: (state, { payload }) => {
    state.preview = payload;
  }
});

// action creator export
export const utilActions = {
  uploadImage,
  setPreview
};

export default util;
