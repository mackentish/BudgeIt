import {useMutation} from '@tanstack/react-query';
import {loginUser as loginFn, createUser as createFn} from '../../api/users';
import {Alert} from 'react-native';
import {Dispatch, SetStateAction} from 'react';
import {User} from '../../types';

export default function useUser(
  setUser: Dispatch<SetStateAction<User | undefined>>,
) {
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

  return {loginUser, createUser};
}
