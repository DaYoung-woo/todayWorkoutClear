import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatSvg from '../../assets/icons/chat.svg';

import {feedListApi, getAccountInfoApi} from '../../api';
import NoFeedSvg from '../../assets/icons/noFeed.svg';
import Toast from 'react-native-toast-message';

const Home = ({navigation}) => {
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    loadAccountInfo();
    loadFeedList();
  }, []);

  // 사용자 정보 api
  const loadAccountInfo = async () => {
    try {
      const res = await getAccountInfoApi();
      saveUserInfo(res.data.result);
    } catch (e) {
      console.log(e);
      if (e?.response?.status === 400) {
        Toast.show({
          type: 'error',
          text1: '로그인 기간이 만료되었습니다.',
        });
      }
      navigation.navigate('Login');
    }
  };

  // storage에 사용자 정보 저장
  const saveUserInfo = async userInfo => {
    try {
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (e) {
      console.log(e);
    }
  };

  // 피드리스트 api
  const loadFeedList = async () => {
    try {
      const param = {
        page: 0,
        pageSize: 10,
      };
      const res = await feedListApi(param);
      setFeedList(res.data.result.content);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={{flexGrow: 1}}>
        {/* TopBar */}
        <View style={styles.topBar}>
          {/* left 로고 영역 */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/icons/arm.png')}
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
        {/* <View style={styles.storyContainer}>
            <View style={styles.storyItem}>
              <Image
                source={require('../../assets/images/basicUser.png')}
                style={styles.storyItemImage}
              />
              <Text style={styles.storyItemText}>iamwooda0</Text>
              <View />
            </View>
            <View style={styles.storyItem}>
              <Image
                source={require('../../assets/images/basicUser.png')}
                style={styles.storyItemImage}
              />
              <Text style={styles.storyItemText} numberOfLines={1}>
                iamwooda
              </Text>
              <View />
            </View>
          </View> */}

        {/* 사용자 피드 리스트 영역 */}
        <View style={styles.feedArea}>
          <NoFeedSvg
            style={styles.noFeedIcon}
            color="#ddd"
            width={42}
            height={48}
          />
          <Text style={styles.noFeedText}>
            {'피드가 비어 있습니다. \n팔로우할 친구를 찾아보세요!'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    paddingHorizontal: 8,
    color: '#555',
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollArea: {flex: 1},
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
    flexDirection: 'row',
    paddingVertical: 12,
  },
  storyItem: {
    alignItems: 'center',
    width: 84,
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
    fontFamily: 'GmarketSansTTFMedium',
    fontWeight: 'thin',
    fontSize: 12,
  },
  feedArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noFeedIcon: {
    marginBottom: 8,
  },
  noFeedText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontWeight: 'semibold',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Home;
