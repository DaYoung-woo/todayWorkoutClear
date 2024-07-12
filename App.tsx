/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import Router from './src/router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Router />
        <Toast />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
