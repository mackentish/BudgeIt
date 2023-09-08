import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import { createUser as createFn, loginUser as loginFn } from '../../api/users';
import { User } from '../../types';

export default function useUser(setUser: Dispatch<SetStateAction<User | undefined>>) {
  const loginUser = useMutation(loginFn, {
    onSuccess: data => {
      setUser(data);
    },
    onError: () => {
      Alert.alert('Error', 'Invalid email or password');
    },
  });

  const createUser = useMutation(createFn, {
    onSuccess: data => {
      setUser(data);
    },
    onError: () => {
      Alert.alert('Error', 'Unable to create account');
    },
  });

  return { loginUser, createUser };
}
