import { setItemAsync, getItemAsync } from 'expo-secure-store';

const setSecureStore = async (key: string, value: string) => {
  await setItemAsync(key, value);
};

const getSecureStore = async (key: string) => {
  return await getItemAsync(key);
};

export default { setSecureStore, getSecureStore };
