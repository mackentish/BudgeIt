import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from './src/constants/globalStyle';
import TabNavigator from './src/navigation/TabNavigator';
import { OverlayContext, UserProvider } from './src/state/context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 5 minutes
      refetchOnWindowFocus: __DEV__ ? false : true,
      retry: false,
    },
  },
});

function App(): JSX.Element {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.gestureWrapper}>
        <OverlayContext.Provider value={{ showOverlay, setShowOverlay }}>
          <PortalProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <MenuProvider>
                  {showOverlay && <View style={styles.overlay} />}
                  <UserProvider>
                    <TabNavigator />
                  </UserProvider>
                </MenuProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </PortalProvider>
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
