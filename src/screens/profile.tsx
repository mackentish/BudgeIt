import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, font } from '../constants/globalStyle';
import { AnimatedPressable } from '../components';
import { UserContext } from '../state/context/UserProvider';

/**
 * Default page for user settings. User has access to other screens from here
 */
export default function Profile() {
  const { signOut } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Settings</Text>
      <AnimatedPressable style={styles.signOutBtn} onPress={signOut}>
        <Text style={styles.btnText}>Sign Out</Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.temp.gray,
    flex: 1,
    padding: 30,
  },
  headerText: {
    fontSize: 20,
    fontFamily: font.regular,
    color: colors.temp.black,
  },
  btnText: {
    fontSize: 15,
    fontFamily: font.semiBold,
    color: colors.temp.white,
  },
  signOutBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.temp.red,
  },
});
