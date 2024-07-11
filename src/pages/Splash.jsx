import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    movePage();
  }, []);
  const movePage = async () => {
    const isLogin = await AsyncStorage.getItem('isLogin');
    setTimeout(() => {
      if (JSON.parse(isLogin)) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>오운완</Text>
      </View>
    </SafeAreaView>
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
    marginTop: -8,
  },
  logoText: {
    fontFamily: 'GamjaFlower-Regular',
    fontSize: 52,
    color: '#2E8CF4',
  },
});
export default Splash;
