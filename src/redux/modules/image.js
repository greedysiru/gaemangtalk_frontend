import { createReducer, createAction } from '@reduxjs/toolkit';
import { userAPI } from '../../shared/api';

export const initialState = {
  image_url: null,
  uploading: false,
  preview: null
};

const uploading = createAction('image/UPLOADING');
const setPreview = createAction('image/SET_PREVIEW');
const uploading = createAction('image/UPLOADING');
