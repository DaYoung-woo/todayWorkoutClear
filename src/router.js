import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Login from './pages/Login';
import Splash from './pages/Splash';
import BasicHeader from './components/BasicHeader';

const Stack = createNativeStackNavigator();

const Router = () => {
  const basicHeader = ({options, navigation}) => {
    return (
      <BasicHeader
        {...options}
        title={options.title}
        back={options.back}
        navigation={navigation}
      />
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: basicHeader,
            title: '로그인',
            back: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
