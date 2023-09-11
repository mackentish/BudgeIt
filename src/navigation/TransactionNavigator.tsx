import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AddTransaction, SelectTags } from '../screens/sheets';

export type TransactionStackParams = {
  addTransaction: undefined;
  selectTags: undefined;
};

export default function TransactionNavigator() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="addTransaction" component={AddTransaction} />
        <Screen name="selectTags" component={SelectTags} />
      </Navigator>
    </NavigationContainer>
  );
}
