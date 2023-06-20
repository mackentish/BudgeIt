import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { colors, font } from '../constants/globalStyle';
import { AnimatedPressable } from '../components';
import { UserContext } from '../state/context/UserProvider';

export default function UserSettings() {
  const { signOut } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Settings</Text>
      <AnimatedPressable style={styles.btn} onPress={() => Alert.alert('TODO: Add stack screen')}>
        <Text style={styles.btnText}>Add Funds</Text>
      </AnimatedPressable>
      <AnimatedPressable style={[styles.btn, styles.signOutBtn]} onPress={signOut}>
        <Text style={styles.btnText}>Sign Out</Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    padding: 30,
  },
  headerText: {
    fontSize: 20,
    fontFamily: font.regular,
    color: colors.white,
    marginBottom: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: colors.tertiary,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 20,
    fontFamily: font.semiBold,
    color: colors.white,
  },
  signOutBtn: {
    backgroundColor: colors.red,
  },
});
