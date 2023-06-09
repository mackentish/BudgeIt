import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home, Projections, Reports, UserSettings } from './src/screens';
import { UserProvider } from './src/state/context/UserProvider';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from './src/constants/globalStyle';
import { Footer, Header } from './src/components';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.gestureWrapper}>
        <NavigationContainer>
          <SafeAreaView style={styles.safeView} />
          <UserProvider>
            <Header />
            <Tab.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="home"
              tabBar={props => Footer({ ...props })}>
              <Tab.Screen name="home" component={Home} />
              <Tab.Screen name="reports" component={Reports} />
              <Tab.Screen name="projections" component={Projections} />
              <Tab.Screen name="userSettings" component={UserSettings} />
            </Tab.Navigator>
          </UserProvider>
          <SafeAreaView style={styles.safeView} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 0,
    backgroundColor: colors.primary,
  },
  gestureWrapper: {
    flex: 1,
  },
});

export default App;
