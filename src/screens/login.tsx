import React, {useContext} from 'react';
import {UserContext} from '../state/context/UserProvider';
import {Text, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import AnimatedPressable from '../components/AnimatedPressable';
import {loginUser} from '../api/users';

// login component that shows children if logged in
export default function Login({children}: {children: JSX.Element}) {
  const {user, setUser} = useContext(UserContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  if (!user) {
    return (
      <KeyboardAvoidingView>
        <Text>Login</Text>
        <TextInput placeholder="Username" onChangeText={setUsername} />
        <TextInput placeholder="Password" onChangeText={setPassword} />
        <AnimatedPressable
          onPress={async () => {
            const response = await loginUser(username, password);
            if (response.ok) {
              setUser(response.val);
            } else {
              Alert.alert('Login failed', response.val);
            }
          }}>
          <Text>Submit</Text>
        </AnimatedPressable>
      </KeyboardAvoidingView>
    );
  }

  return <>{children}</>;
}
