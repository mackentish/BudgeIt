import {API_URL, API_KEY} from '@env';
import {User, UserLogin} from '../types';

const loginUser = async (loginData: UserLogin) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    return data as User;
  } catch (error) {
    throw new Error('Error logging in');
  }
};

export {loginUser};
