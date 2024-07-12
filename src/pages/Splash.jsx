import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setCookie} from '../api';

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
        checkCookieExpire(storageCookie);
      }
    }, 2000);
  };

  // 쿠키 유효기간이 남아있는지 확인
  const checkCookieExpire = storageCookie => {
    const cookie = JSON.parse(storageCookie);
    const expire = cookie.match('(^|;) ?Expires=([^;]*)(;|$)')[2];
    const now = new Date();
    if (now < expire) {
      navigation.navigate('Login');
    } else {
      //setCookie(storageCookie);
      navigation.navigate('Home');
    }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F9FF',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    height: 80,
    width: 80,
    marginTop: -16,
  },
  logoText: {
    fontFamily: 'JalnanGothicTTF',
    fontSize: 40,
    color: '#2E8CF4',
  },
});
export default Splash;
