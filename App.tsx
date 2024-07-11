/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import Router from './src/router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <Router />
      <Toast />
    </GestureHandlerRootView>
  );
}

export default App;
