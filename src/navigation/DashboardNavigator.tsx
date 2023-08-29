import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardStacks } from '../constants/navigation';
import { AllPockets, Dashboard } from '../screens';

const { Navigator, Screen } = createStackNavigator();

export default function DashboardNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={DashboardStacks.DASHBOARD} component={Dashboard} />
      <Screen name={DashboardStacks.ALL_POCKETS} component={AllPockets} />
    </Navigator>
  );
}
