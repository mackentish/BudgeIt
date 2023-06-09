import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextInput, KeyboardAvoidingView, StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import { useUser } from '../state/queries';
import { Button, Header, LoadingSpinner } from '../components';
import { colors, font } from '../constants/globalStyle';
import { User } from '../types';

/**
 * Login screen for existing users
 * @param signUp - function to set the screen to sign up
 */
const LoginScreen = ({
  setUser,
  setSignUp,
}: {
  setUser: Dispatch<SetStateAction<User | undefined>>;
  setSignUp: () => void;
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useUser(setUser);

  // NOTE: hash password with salt from .env every time we get it from input
  // Biometrics flow
  // FIRST TIME:
  // request biometrics with own prompt, store result using persistent storage (https://github.com/mrousavy/react-native-mmkv/blob/master/docs/HOOKS.md)
  // user logs in or creates account
  // if biometrics enabled, use secure storage to store credentials
  // log user in with stored credentials
  // EVERY TIME AFTER:
  // if biometrics enabled, use secure storage to retrieve credentials
  // log user in with stored credentials
  // otherwise, log in as normal

  // use expo LocalAuthentication to get biometrics
  // hasHardware && isEnrolled -> authenticateAsync

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView style={styles.form}>
        {loginUser.isLoading && <LoadingSpinner />}
        <TextInput
          placeholder="Username"
          autoCapitalize="none"
          textContentType="emailAddress"
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
          onChangeText={setPassword}
          style={styles.input}
        />
        <Button
          title="Log In"
          onPress={() => {
            loginUser.mutate({
              email: username,
              password: password,
            });
          }}
        />
        <Pressable onPress={setSignUp}>
          <Text style={styles.textBtn}>Create Account</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

/**
 * Sign up screen for new users
 * @param login - function to set the screen to login
 */
const SignUpScreen = ({
  setUser,
  setLogIn,
}: {
  setUser: Dispatch<SetStateAction<User | undefined>>;
  setLogIn: () => void;
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { createUser } = useUser(setUser);

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView style={styles.form}>
        {createUser.isLoading && <LoadingSpinner />}
        <TextInput placeholder="First Name" onChangeText={setFirstName} style={styles.input} />
        <TextInput placeholder="Last Name" onChangeText={setLastName} style={styles.input} />
        <TextInput placeholder="Username" autoCapitalize="none" onChangeText={setUsername} style={styles.input} />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setPasswordConfirm}
          style={styles.input}
        />
        <Button
          title="Sign Up"
          onPress={() => {
            // TODO: Validate inputs and show error messages under inputs if invalid
            if (password !== passwordConfirm) {
              Alert.alert('Passwords do not match');
              return;
            }
            createUser.mutate({
              firstName: firstName,
              lastName: lastName,
              email: username,
              password: password,
            });
          }}
        />
        <Pressable onPress={setLogIn}>
          <Text style={styles.textBtn}>Log In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

/**
 * Login component that shows children if logged in, otherwise shows login screen
 * @param children - children to show if logged in
 */
export default function Login({ setUser }: { setUser: Dispatch<SetStateAction<User | undefined>> }) {
  const [isLogIn, setIsLogIn] = useState(true);

  return isLogIn ? (
    <LoginScreen setSignUp={() => setIsLogIn(false)} setUser={setUser} />
  ) : (
    <SignUpScreen setLogIn={() => setIsLogIn(true)} setUser={setUser} />
  );
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
  textBtn: {
    color: colors.secondary,
    fontFamily: font.semiBold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
