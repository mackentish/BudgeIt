import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TextInput, KeyboardAvoidingView, StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import { useUser } from '../state/queries';
import { Button, Header, LoadingSpinner, Modal } from '../components';
import { colors, font } from '../constants/globalStyle';
import {
  deviceHasBiometricsKey,
  haveBiometricsPermissionKey,
  havePromptedForBiometricsKey,
  persistNextLoginKey,
  userCredentialsKey,
} from '../constants/persistentStorage';
import { User, UserLogin } from '../types';
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv';
import * as LocalAuthentication from 'expo-local-authentication';
import { EncryptValue, DecryptValue } from '../utils';

/**
 * Modal prompting user to enable biometrics
 */
const BiometricsModal = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [, setHaveBiometricsPermissions] = useMMKVBoolean(haveBiometricsPermissionKey);
  const [, setPersistNextLogin] = useMMKVBoolean(persistNextLoginKey);

  const handleResponse = async (response: boolean) => {
    if (response) setPersistNextLogin(true);
    setHaveBiometricsPermissions(response);
    setVisible(false);
    await LocalAuthentication.authenticateAsync();
  };

  return (
    <Modal visible={visible}>
      <View style={modalStyles.container}>
        <Text style={[modalStyles.text, modalStyles.header]}>Enable Biometrics?</Text>
        <Text style={[modalStyles.text, modalStyles.subText]}>
          Allow budge-it to enable biometrics for future logins?
        </Text>
        <View style={modalStyles.btnContainer}>
          <Button title={'Allow'} onPress={() => handleResponse(true)} />
          <Button title={"Don't Allow"} onPress={() => handleResponse(false)} />
        </View>
      </View>
    </Modal>
  );
};

/**
 * Login screen for existing users
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
  // Biometrics
  const [haveBiometricsPermission] = useMMKVBoolean(haveBiometricsPermissionKey);
  const [deviceHasBiometrics, setDeviceHasBiometrics] = useMMKVBoolean(deviceHasBiometricsKey);
  const [havePromptedForBiometrics, setHavePromptedForBiometrics] = useMMKVBoolean(havePromptedForBiometricsKey);
  const [persistNextLogin] = useMMKVBoolean(persistNextLoginKey);
  const [userCredentials, setUserCredentials] = useMMKVString(userCredentialsKey);
  const [openBiometrics, setOpenBiometrics] = useState(false);

  /**
   * First checks storage to see if we have this response already.
   * If we do, return that value.
   * If we don't, check if the device has biometrics and store
   * that response in storage.
   */
  const checkDeviceHardware = async () => {
    if (deviceHasBiometrics) {
      return deviceHasBiometrics;
    } else {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const result = hasHardware && isEnrolled;
      setDeviceHasBiometrics(result);
      return result;
    }
  };

  /**
   * Checks if biometrics are enabled for the user.
   * If they are, authenticate with biometrics.
   * If not, check if the user has denied biometrics.
   * If they haven't, check if the device has biometrics.
   * If they do, prompt the user to enable biometrics.
   * If they accept, prompt the device for biometrics.
   * Have user log in and store credentials.
   */
  const checkBiometrics = async () => {
    // if biometrics enabled and we have stored user credentials, authenticate with biometrics
    if (haveBiometricsPermission && userCredentials) {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        // decrypt credentials
        const decryptedValue = JSON.parse(DecryptValue(userCredentials)) as UserLogin;
        // log user in
        loginUser.mutate({
          email: decryptedValue.email,
          password: decryptedValue.password,
        });
      }
    }
    // else check if the device has biometrics
    if (await checkDeviceHardware()) {
      // check if we have already prompted the user to enable biometrics
      if (!havePromptedForBiometrics) {
        // if we haven't, prompt the user to enable biometrics
        setOpenBiometrics(true);
        setHavePromptedForBiometrics(true);
      }
    }
  };

  useEffect(() => {
    checkBiometrics();
  });

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
            if (persistNextLogin) {
              // encrypt credentials
              const encryptedValue = EncryptValue(JSON.stringify({ email: username, password: password }));
              // store credentials
              setUserCredentials(encryptedValue);
            }
            loginUser.mutate({
              email: username,
              password: password,
            });
          }}
        />
        <Pressable onPress={setSignUp}>
          <Text style={styles.textBtn}>Create Account</Text>
        </Pressable>
        {persistNextLogin && <Text style={styles.text}>Log in to activate biometrics.</Text>}
      </KeyboardAvoidingView>
      <BiometricsModal visible={openBiometrics} setVisible={setOpenBiometrics} />
    </View>
  );
};

/**
 * Sign up screen for new users
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
  text: {
    color: colors.white,
    fontFamily: font.semiBold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

const modalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  text: {
    color: 'black',
  },
  header: {
    fontFamily: font.extraBold,
    fontSize: 24,
  },
  subText: {
    fontFamily: font.semiBold,
    fontSize: 16,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});
