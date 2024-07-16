import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/SplashStyle';
import {checkCookieExpire} from '../utils/helpers';

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
        <Image
          source={require('../assets/icons/arm.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>오운완</Text>
      </View>
    </View>
  );
};

export default Splash;
