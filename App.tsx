import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home, Template, Summary, Profile } from './src/screens';
import { UserProvider } from './src/state/context/UserProvider';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from './src/constants/globalStyle';
import { Footer } from './src/components';
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
          <SafeAreaView style={styles.topSafeView} />
          <SafeAreaView style={styles.bottomSafeView}>
            <UserProvider>
              <Tab.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="home"
                tabBar={props => Footer({ ...props })}>
                <Tab.Screen name="home" component={Home} />
                <Tab.Screen name="templates" component={Template} />
                <Tab.Screen name="summary" component={Summary} />
                <Tab.Screen name="profile" component={Profile} />
              </Tab.Navigator>
            </UserProvider>
          </SafeAreaView>
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  topSafeView: {
    flex: 0,
    backgroundColor: colors.temp.red,
  },
  bottomSafeView: {
    flex: 1,
    backgroundColor: colors.temp.red,
  },
  gestureWrapper: {
    flex: 1,
    height: '100%',
  },
});

export default App;
