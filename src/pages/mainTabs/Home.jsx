import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ChatSvg from '../../assets/icons/chat.svg';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {feedListApi} from '../../api';

const Home = () => {
  const [feedList, setFeedList] = useState([]);
  useEffect(() => {
    loadFeedList();
  }, []);

  // 피드리스트 api
  const loadFeedList = async () => {
    try {
      const param = {
        page: 0,
        pageSize: 10,
      };
      const res = await feedListApi(param);
      console.log(res.data.content);
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView>
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
        <View style={styles.storyContainer}>
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
        </View>

        {/* 사용자 피드 리스트 영역 */}
        <View>
          <Text>sdf</Text>
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
    fontFamily: 'NanumPenScript-Regular',
    fontWeight: 'thin',
    fontSize: 12,
  },
});

export default Home;
