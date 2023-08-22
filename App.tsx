import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home, Template, Summary, Profile } from './src/screens';
import { UserProvider, OverlayContext } from './src/state/context';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { colors } from './src/constants/globalStyle';
import { Footer } from './src/components';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: __DEV__ ? false : true,
      retry: false,
    },
  },
});
const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.gestureWrapper}>
        <OverlayContext.Provider value={{ showOverlay, setShowOverlay }}>
          <NavigationContainer>
            <SafeAreaView style={styles.topSafeView} />
            <SafeAreaView style={styles.bottomSafeView}>
              <MenuProvider>
                {showOverlay && <View style={styles.overlay} />}
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
              </MenuProvider>
            </SafeAreaView>
          </NavigationContainer>
        </OverlayContext.Provider>
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
  overlay: {
    backgroundColor: colors.temp.black,
    opacity: 0.2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default App;
