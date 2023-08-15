import axios from 'axios';

// request interceptor to add auth token header to requests (if it exists)
axios.interceptors.request.use(
  config => {
    const { accessToken } = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = 'Bearer ' + accessToken;
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
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token') {
      router.push('/login');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken();
      return axios
        .post('/auth/token', {
          refresh_token: refreshToken,
        })
        .then(res => {
          if (res.status === 201) {
            localStorageService.setToken(res.data);
            axios.defaults.headers.common.Authorization = 'Bearer ' + localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  },
);
