import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
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
    <View style={[styles.col, styles.container]}>
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
  const { user } = useContext(UserContext);
  const [amount, setAmount] = useState(0);

  const addFunds = () => {
    Alert.alert(
      'Add Funds',
      `Adding ${amount} to your account will give you an unallocated total of ${amount + user.unallocated}`,
    );
  };

  return (
    <View style={[styles.col, styles.container]}>
      <BackButton navigation={navigation} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Add Funds</Text>
        <Text style={styles.text}>
          Adding funds below will add to your "unallocated" amount. Your unallocated amount is the funds you are able to
          pull from and add to Pockets.
        </Text>
      </View>
      <View style={styles.col}>
        <TextInput
          style={styles.input}
          onChange={text => setAmount(Number(text))}
          placeholder="Enter Amount"
          keyboardType="numeric"
        />
        <View style={styles.row}>
          <AnimatedPressable style={styles.btn} onPress={addFunds}>
            <Text style={styles.btnText}>Add Amount</Text>
          </AnimatedPressable>
          <AnimatedPressable style={[styles.btn, styles.signOutBtn]} onPress={addFunds}>
            <Text style={styles.btnText}>Subtract Amount</Text>
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
}

/**
 * Page for user to set up recurring pocket distributions
 * TODO: Add functionality to set up recurring pocket distributions
 */
function PocketDistributions({ navigation }: { navigation: any }) {
  return (
    <View style={[styles.col, styles.container]}>
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
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  container: {
    gap: 16,
    backgroundColor: colors.temp.gray,
    flex: 1,
    padding: 30,
  },
  text: {
    fontSize: 12,
    fontFamily: font.italic,
    color: colors.temp.black,
    textAlign: 'center',
  },
  headerText: {
    fontSize: 20,
    fontFamily: font.regular,
    color: colors.temp.black,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: colors.temp.black,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 15,
    fontFamily: font.semiBold,
    color: colors.temp.white,
  },
  signOutBtn: {
    backgroundColor: colors.temp.red,
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
    color: colors.temp.black,
  },
  backBtnArrow: {
    fontSize: 15,
    color: colors.temp.black,
  },
  input: {
    backgroundColor: colors.temp.white,
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
  },
});
