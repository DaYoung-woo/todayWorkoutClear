import React from 'react';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from './pages/mainTabs/Home';
import Login from './pages/Login';
import Splash from './pages/Splash';
import BasicHeader from './components/BasicHeader';
import Regist from './pages/Regist';
import BottomTab from './components/BottomTab';
import Search from './pages/mainTabs/Search';
import Play from './pages/mainTabs/Play';
import Plus from './pages/mainTabs/Plus';
import Account from './pages/mainTabs/Account';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

const loadBottomTab = props => {
  return <BottomTab {...props} />;
};
const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={loadBottomTab}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Plus" component={Plus} options={{headerShown: false}} />
      <Tab.Screen name="Play" component={Play} options={{headerShown: false}} />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Regist"
          component={Regist}
          options={{
            header: basicHeader,
            title: '회원가입',
            back: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
