import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, font } from '../constants/globalStyle';
import { AnimatedPressable } from '../components';
import { UserContext } from '../state/context/UserProvider';

export default function UserSettings() {
  const { signOut } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Settings</Text>
      <AnimatedPressable style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
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
  signOutBtn: {
    padding: 10,
    backgroundColor: colors.red,
    borderRadius: 10,
  },
  signOutText: {
    fontSize: 20,
    fontFamily: font.semiBold,
    color: colors.white,
  },
});
