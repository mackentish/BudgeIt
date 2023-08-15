import { API_URL } from '@env';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../state/context/UserProvider';

const tokenStore = {
  accessToken: undefined,
  refreshToken: undefined,
};

function ClearUserSession() {
  tokenStore.accessToken = undefined;
  tokenStore.refreshToken = undefined;
  const { signOut } = useContext(UserContext);
  signOut();
}

export default () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${tokenStore.accessToken}`,
    },
  });
};

// request interceptor to add auth token header to requests (if it exists)
axios.interceptors.request.use(
  config => {
    if (tokenStore.accessToken) {
      config.headers.Authorization = 'Bearer ' + tokenStore.accessToken;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  response => {
    if (response.data.tokens) {
      tokenStore.accessToken = response.data.tokens.accessToken;
      tokenStore.refreshToken = response.data.tokens.refreshToken;
    }
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === `${API_URL}/users/refresh`) {
      ClearUserSession();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post(`${API_URL}/users/refresh`, {
          refreshToken: tokenStore.refreshToken,
        })
        .then(res => {
          if (res.status === 201) {
            tokenStore.accessToken = res.data.accessToken;
            tokenStore.refreshToken = res.data.refreshToken;
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  },
);
