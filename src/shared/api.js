import axios from 'axios';

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://15.164.97.250:8080';

/* const openApi = axios.create();
openApi.defaults.withCredentials=false;
const token = `KakaoAK 08f47c215f89ea20492b07610fc231dc`
 */
export const userAPI = {
  login: function (data) {
    return axios.post('/api/user/login', data);
  },
  loginByKakao: function (data) {
    return axios.post('/api/user/kakaoLogin', data);
  },
  logout: function () {
    return axios.post('/user/logout');
  },
  signup: function (data) {
    return axios.post(`/api/user/signup`, data);
  },
  emailCheck: function (data) {
    return axios.post(`/api/user/signup/emailCheck`, data);
  },
  findPassword: function (data) {
    return axios.post('/api/user/findPassword', data);
  },
  updatePassword: function (data) {
    return axios.put('/api/user/changePassword', data);
  },
  getUserProfile: function (data) {
    return axios.get('/api/user/profile');
  },
  updateUserProfile: function (userId, data) {
    return axios.put(`/api/user/profile/${userId}`, data);
  }
};

export const chatAPI = {
  createRoom: function (data) {
    return axios.post(`/api/chat/rooms`, data);
  },
  getChatList: function () {
    return axios.get(`/api/chat/rooms`);
  },
  getChatMessages: function (roomId) {
    return axios.get(`/api/chat/rooms/${roomId}/messages`);
  }
};

export const utilAPI = {
  uploadImage: function (userId, data) {
    return axios({
      method: 'post',
      url: `/api/s3upload`,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    //return axios.put(`/api/s3upload`, data);
  }
};
