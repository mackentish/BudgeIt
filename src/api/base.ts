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
    if (response.data.tokens) {
      tokenStore.accessToken = response.data.tokens.accessToken;
      tokenStore.refreshToken = response.data.tokens.refreshToken;
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    console.log('refresh error?', originalRequest.url === `${API_URL}/users/refresh`, originalRequest.url);
    if (originalRequest.url === `${API_URL}/users/refresh`) {
      ClearTokenStore();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data: tokens } = await axios.post(`${API_URL}/users/refresh`, {
          email: 'john.doe@mailinator.com', // TODO: put the actual email here
          refreshToken: tokenStore.refreshToken,
        });

        console.log('refreshed tokens', tokens);

        tokenStore.accessToken = tokens.accessToken;
        tokenStore.refreshToken = tokens.refreshToken;
        baseInstance.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;

        return baseInstance(originalRequest);
      } catch (err) {
        // handle error regarding token refresh
        console.log(err);
        ClearTokenStore();
      }
    }
    return Promise.reject(error);
  },
);

export default baseInstance;
