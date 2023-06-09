import {useMutation} from 'react-query';
import {loginUser as loginFn} from '../../api/users';
import {Alert} from 'react-native';
import {useContext} from 'react';
import {UserContext} from '../context/UserProvider';

export default function useUser() {
  const {setUser} = useContext(UserContext);
  const loginUser = useMutation(loginFn, {
    onSuccess: data => {
      setUser(data);
    },
    onError: () => {
      Alert.alert('Error', 'Invalid email or password');
    },
  });

  return {loginUser};
}
