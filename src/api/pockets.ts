import { Pocket } from '../types';
import { API_URL, API_KEY } from '@env';
import BaseInstance from './base';
// TODO: why do I have to use BaseInstance() here for the interceptors to work
// but not in users.ts???

const fetchPockets = async (userId: string) => {
  const response = await BaseInstance().get(`/pockets/${userId}`, {
    headers: {
      'X-API-KEY': API_KEY,
      Accept: 'application/json',
    },
  });
  const data = response.data;
  return data as Pocket[];
};

const updatePocket = async (pocket: Pocket) => {
  const response = await BaseInstance().put(`${API_URL}/pockets/${pocket._id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      name: pocket.name,
      amount: pocket.amount,
    },
  });
  const data = await response.data;
  return data as Pocket;
};

const createPocket = async (pocket: Pocket, userId: string) => {
  const response = await BaseInstance().post(`${API_URL}/pockets`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      name: pocket.name,
      amount: pocket.amount,
      user: userId,
    },
  });
  const data = await response.data;
  return data as Pocket;
};

export { fetchPockets, updatePocket, createPocket };
