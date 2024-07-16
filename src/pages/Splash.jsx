import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/SplashStyle';
import {checkCookieExpire} from '../utils/helpers';
import Logo from '../components/common/Logo';

const Splash = ({navigation}) => {
  useEffect(() => {
    checkCookieExist();
  }, []);

  // 쿠키가 존재하는지 확인
  const checkCookieExist = async () => {
    const storageCookie = await AsyncStorage.getItem('cookie');
    setTimeout(() => {
      if (!storageCookie) {
        navigation.navigate('Login');
      } else {
        checkCookieExpire(storageCookie, navigation);
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Logo width={80} height={80} fonsSize={40} marginTop={-2} />
      </View>
    </View>
  );
};

export default Splash;
