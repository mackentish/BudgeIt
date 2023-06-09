import React, {useContext} from 'react';
import {UserContext} from '../state/context/UserProvider';
import {TextInput, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {useUser} from '../state/queries';
import {Button, Header, LoadingSpinner} from '../components';
import {colors, font} from '../constants/globalStyle';

// login component that shows children if logged in
export default function Login({children}: {children: JSX.Element}) {
  const {user} = useContext(UserContext);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {loginUser} = useUser();

  if (!user) {
    return (
      <View style={styles.container}>
        <Header />
        <KeyboardAvoidingView style={styles.form}>
          {loginUser.isLoading && <LoadingSpinner />}
          <TextInput
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button
            title="Login"
            onPress={() => {
              loginUser.mutate({
                email: username,
                password: password,
              });
            }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 30,
    fontFamily: font.extraBold,
    color: colors.white,
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
