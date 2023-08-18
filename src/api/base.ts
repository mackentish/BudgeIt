import { API_URL } from '@env';
import axios from 'axios';

const tokenStore = {
  accessToken: undefined,
  refreshToken: undefined,
};

function ClearTokenStore() {
  tokenStore.accessToken = undefined;
  tokenStore.refreshToken = undefined;
}

const baseInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${tokenStore.accessToken}`,
  },
});

// request interceptor to add auth token header to requests (if it exists)
baseInstance.interceptors.request.use(
  function (config) {
    console.log('intercepted request', config.url, tokenStore.accessToken);
    if (tokenStore.accessToken) {
      config.headers.Authorization = 'Bearer ' + tokenStore.accessToken;
    }
    return config;
  },
  function (error) {
    Promise.reject(error);
  },
);

// response interceptor to refresh token on receiving token expired error
baseInstance.interceptors.response.use(
  function (response) {
    console.log('tokens', response.data.tokens);
    if (response.data.tokens) {
      tokenStore.accessToken = response.data.tokens.accessToken;
      tokenStore.refreshToken = response.data.tokens.refreshToken;
    }
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    console.log('intercepted error', originalRequest.url, error.response.status);

    if (error.response.status === 401 && originalRequest.url === `${API_URL}/users/refresh`) {
      ClearTokenStore();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post(`${API_URL}/users/refresh`, {
          refreshToken: tokenStore.refreshToken,
        })
        .then(res => {
          console.log('refresh response', res);
          if (res.status === 201) {
            tokenStore.accessToken = res.data.accessToken;
            tokenStore.refreshToken = res.data.refreshToken;
            originalRequest.headers.Authorization = 'Bearer ' + res.data.accessToken;
            return axios(originalRequest);
          }
        })
        .catch(err => {
          console.log('refresh error', err);
          ClearTokenStore();
        });
    }
    return Promise.reject(error);
  },
);

export default baseInstance;
