import { Pocket } from '../types';
import { API_URL, API_KEY } from '@env';

const fetchPockets = async (userId: string) => {
  const response = await fetch(`${API_URL}/pockets/${userId}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
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

const createPocket = async (pocket: Pocket, userId: string) => {
  const response = await fetch(`${API_URL}/pockets`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: pocket.name,
      amount: pocket.amount,
      user: userId,
    }),
  });
  const data = await response.json();
  return data as Pocket;
};

export { fetchPockets, updatePocket, createPocket };
