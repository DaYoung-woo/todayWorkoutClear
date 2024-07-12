import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatSvg from '../assets/icons/chat.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Home = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      {/* TopBar */}
      <View style={styles.topBar}>
        {/* left 로고 영역 */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/icons/arm.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>오운완</Text>
        </View>
        {/* right 메시지 아이콘 */}
        <TouchableOpacity>
          <ChatSvg width={28} height={28} color={'#3e3e3e'} />
        </TouchableOpacity>
      </View>

      {/* 사용자 스토리 리스트 영역 */}
      <View style={styles.storyContainer}>
        <View style={styles.storyItem}>
          <Image
            source={require('../assets/images/basicUser.png')}
            style={styles.storyItemImage}
          />
          <Text>sdf</Text>
          <View />
        </View>
      </View>

      {/* 사용자 피드 리스트 영역 */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    paddingHorizontal: 8,
    color: '#555',
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginTop: 4,
  },
  logoImage: {
    height: 32,
    width: 32,
    marginTop: -4,
  },
  logoText: {
    fontFamily: 'JalnanGothicTTF',
    fontSize: 20,
    color: '#2E8CF4',
  },
  storyContainer: {
    paddingVertical: 12,
  },
  storyItem: {
    paddingHorizontal: 12,
  },
  storyItemImage: {
    width: 56,
    height: 56,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 100,
  },
  storyItemText: {
    fontFamily: '',
  },
});

export default Home;
