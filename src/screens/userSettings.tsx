import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, font } from '../constants/globalStyle';
import { AnimatedPressable } from '../components';
import { UserContext } from '../state/context/UserProvider';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

/**
 * Back button reused by all screens in this file
 */
function BackButton({ navigation }: { navigation: any }) {
  return (
    <Pressable style={styles.backBtn} onPress={() => navigation.navigate('userNav')}>
      <Icon name="arrow-left" style={styles.backBtnArrow} />
      <Text style={styles.backBtnText}>Back</Text>
    </Pressable>
  );
}

/**
 * Default page for user settings. User has access to other screens from here
 */
function UserNav({ navigation }: { navigation: any }) {
  const { signOut } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>User Settings</Text>
      <AnimatedPressable style={styles.btn} onPress={() => navigation.navigate('addFunds')}>
        <Text style={styles.btnText}>Add Funds</Text>
      </AnimatedPressable>
      <AnimatedPressable style={styles.btn} onPress={() => navigation.navigate('pocketDist')}>
        <Text style={styles.btnText}>Recurring Distributions</Text>
      </AnimatedPressable>
      <AnimatedPressable style={[styles.btn, styles.signOutBtn]} onPress={signOut}>
        <Text style={styles.btnText}>Sign Out</Text>
      </AnimatedPressable>
    </View>
  );
}

/**
 * Add funds page
 * TODO: Add functionality to add funds
 */
function AddFunds({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text style={styles.headerText}>Add Funds</Text>
      <AnimatedPressable style={styles.btn} onPress={() => navigation.navigate('home')}>
        <Text style={styles.btnText}>Home</Text>
      </AnimatedPressable>
    </View>
  );
}

/**
 * Page for user to set up recurring pocket distributions
 * TODO: Add functionality to set up recurring pocket distributions
 */
function PocketDistributions({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text style={styles.headerText}>Pocket Distributions</Text>
    </View>
  );
}

export default function UserSettings() {
  return (
    <Stack.Navigator initialRouteName="userNav" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="userNav" component={UserNav} />
      <Stack.Screen name="addFunds" component={AddFunds} />
      <Stack.Screen name="pocketDist" component={PocketDistributions} />
    </Stack.Navigator>
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
  backBtn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backBtnText: {
    fontSize: 15,
    fontFamily: font.semiBold,
    color: colors.secondary,
  },
  backBtnArrow: {
    fontSize: 15,
    color: colors.secondary,
  },
});
