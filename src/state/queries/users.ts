import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { Alert } from 'react-native';

import { addUser, addUserTag, loginUser as loginFn } from '../../api/users';
import { UserContext } from '../context';

export default function useUser() {
  const { setUser } = useContext(UserContext);

  const loginUser = useMutation(loginFn, {
    onSuccess: data => {
      setUser(data);
    },
    onError: () => {
      Alert.alert('Error', 'Invalid email or password');
    },
  });

  const createUser = useMutation(addUser, {
    onSuccess: data => {
      setUser(data);
    },
    onError: () => {
      Alert.alert('Error', 'Unable to create account');
    },
  });

  const createUserTag = useMutation(addUserTag, {
    onSuccess: data => {
      setUser(data);
    },
    onError: () => {
      Alert.alert('Error', 'Unable to create user tag');
    },
  });
  return { loginUser, createUser, createUserTag };
}
