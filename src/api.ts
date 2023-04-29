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

const updatePocket = async (pocket: Pocket) => {
  const response = await fetch(`${API_URL}/pockets/${pocket._id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: pocket.name,
      amount: pocket.amount,
    }),
  });
  const data = await response.json();
  return data as Pocket;
};

export {fetchPockets, updatePocket};
