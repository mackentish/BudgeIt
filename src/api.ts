import {Pocket} from './types';
import {API_URL} from '@env';

const fetchPockets = async () => {
  const response = await fetch(`${API_URL}/pockets`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data as Pocket[];
};

export {fetchPockets};
