import React from 'react';
import {SafeAreaView} from 'react-native';

import Home from './src/screens/home';
import {UserProvider} from './src/state/context/UserProvider';

function App(): JSX.Element {
  return (
    <UserProvider>
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </UserProvider>
  );
}

export default App;
