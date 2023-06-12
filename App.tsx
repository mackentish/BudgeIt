import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {Home} from './src/screens';
import {UserProvider} from './src/state/context/UserProvider';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Home />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
