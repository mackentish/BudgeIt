import {API_URL, API_KEY} from '@env';
import {Ok, Err, Result} from 'ts-results';
import {User} from '../types';

const loginUser = async (
  email: string,
  password: string,
): Promise<Result<User, string>> => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'X-API-KEY': API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status !== 200) {
      return Err('No user found.');
    }
    return Ok(await response.json());
  } catch (error) {
    if (error instanceof Error) {
      return Err(error.message);
    }
    return Err('Unknown error.');
  }
};

export {loginUser};
