import { PocketGroup } from '../types';
import { API_KEY } from '@env';
import baseInstance from './base';

const getGroups = async () => {
  const response = await baseInstance.request({
    url: '/groups',
    method: 'GET',
    headers: {
      'X-API-KEY': API_KEY,
      Accept: 'application/json',
    },
  });
  const data = response.data;
  return data as PocketGroup[];
};

const postGroup = async (group: Omit<PocketGroup, '_id'>) => {
  const response = await baseInstance.request({
    url: '/groups',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: group,
  });
  const data = await response.data;
  return data as PocketGroup;
};

export { getGroups, postGroup };
