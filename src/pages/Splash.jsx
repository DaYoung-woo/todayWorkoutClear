import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {contain} from '../../node_modules/@hapi/hoek/lib/index.d';

const Splash = ({navigation}) => {
  useEffect(() => {
    movePage();
  }, []);
  const movePage = () => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.logoImage}
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
    backgroundColor: '#E6F5FF',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
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
