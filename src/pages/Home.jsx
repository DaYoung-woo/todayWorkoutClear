import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatSvg from '../assets/icons/chat.svg';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.homeContainer}>
        <View style={styles.topBar}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/icons/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>오운완</Text>
          </View>
          <ChatSvg width={28} height={28} color={'#3e3e3e'} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    color: '#555',
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    height: 40,
    width: 40,
    marginTop: -2,
  },
  logoText: {
    fontFamily: 'GamjaFlower-Regular',
    fontSize: 24,
    color: '#2E8CF4',
  },
});

export default Home;
