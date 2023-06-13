import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from './src/screens';
import { UserProvider } from './src/state/context/UserProvider';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from './src/constants/globalStyle';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.top} />
      <SafeAreaView style={styles.bottom}>
        <UserProvider>
          <Home />
        </UserProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  top: {
    flex: 0,
    backgroundColor: colors.primary,
  },
  bottom: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
