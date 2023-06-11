import React from 'react';
import {SafeAreaView} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {Home, Login} from './src/screens';
import {UserProvider} from './src/state/context/UserProvider';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SafeAreaView>
          <Login>
            <Home />
          </Login>
        </SafeAreaView>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
