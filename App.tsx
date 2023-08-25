import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider, OverlayContext } from './src/state/context';
import { StyleSheet, View } from 'react-native';
import { colors } from './src/constants/globalStyle';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigator from './src/navigation/TabNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
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
