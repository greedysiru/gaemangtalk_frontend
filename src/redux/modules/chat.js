import { createReducer, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://54.180.141.91:8080';

export const initialState = {
  chatInfo: []
};