import { API_URL, API_KEY } from '@env';
import { User, UserLogin, UserRegister } from '../types';
import axios from 'axios';

const loginUser = async (loginData: UserLogin) => {
  try {
    const response = await axios(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: loginData,
    });
    const data = await response.data;
    return data.user as User;
  } catch (error) {
    throw new Error('Error logging in');
  }
};

const createUser = async (userData: UserRegister) => {
  try {
    const response = await axios(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: userData,
    });
    const data = await response.data;
    return data.user as User;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

export { loginUser, createUser };
