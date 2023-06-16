import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from './src/screens';
import { UserProvider } from './src/state/context/UserProvider';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from './src/constants/globalStyle';
import { Footer } from './src/components';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.safeView} />
      <UserProvider>
        <Home />
        <Footer />
      </UserProvider>
      <SafeAreaView style={styles.safeView} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 0,
    backgroundColor: colors.primary,
  },
});

export default App;
