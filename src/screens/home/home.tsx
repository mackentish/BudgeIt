import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './dashboard';
import AddPocket from './addPocket';
import { HomeStack } from '../../constants/navigation';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator initialRouteName={HomeStack.DASHBOARD} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HomeStack.DASHBOARD} component={Dashboard} />
      <Stack.Screen name={HomeStack.ADD_POCKET} component={AddPocket} />
    </Stack.Navigator>
  );
}
