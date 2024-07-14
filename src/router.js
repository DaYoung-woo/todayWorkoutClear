import React from 'react';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

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
import Follower from './pages/follow/Follower.jsx';
import Follwing from './pages/follow/Follwing.jsx';
import Mypage from './pages/Mypage.jsx';

const Stack = createNativeStackNavigator();
const TabBottom = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

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

const FollowTab = props => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Follower" component={Follower} />
      <TopTab.Screen name="Follwing" component={Follwing} />
    </TopTab.Navigator>
  );
};

const MainTabs = props => {
  return (
    <TabBottom.Navigator tabBar={loadBottomTab}>
      <TabBottom.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <TabBottom.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <TabBottom.Screen
        name="Plus"
        component={Plus}
        options={{headerShown: false}}
        {...props}
      />
      <TabBottom.Screen
        name="Play"
        component={Play}
        options={{headerShown: false}}
      />
      <TabBottom.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
    </TabBottom.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Follow"
        component={FollowTab}
        options={{
          header: basicHeader,
          title: '팔로우 리스트',
          back: true,
        }}
      />
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{
          header: basicHeader,
          title: '내정보',
          back: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
