import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {feedListApi, getAccountInfoApi} from '../../api';
import {saveUserInfo} from '../../utils/helpers';
import Toast from 'react-native-toast-message';
import FeedChatSvg from '../../assets/icons/feedChat.svg';
import NoFeedSvg from '../../assets/icons/noFeed.svg';
import EmotionGoodSvg from '../../assets/icons/emoticonGood.svg';
import Logo from '../../components/common/Logo';

const screenWidth = Dimensions.get('window').width;

const Home = ({navigation, route}) => {
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
      if (e?.response?.status === 400) {
        Toast.show({type: 'error', text1: '로그인 기간이 만료되었습니다.'});
      } else {
        Toast.show({type: 'error', text1: '에러가 발생했습니다.'});
      }
      navigation.navigate('Login');
    }
  };

  // 피드리스트 api
  const loadFeedList = async () => {
    try {
      const param = {page: 0, pageSize: 10};
      const res = await feedListApi(param);
      setFeedList(res.data.result.content);
    } catch (e) {
      console.log(e);
    }
  };

  // 내정보 페이지로 이동
  const clickProfile = () => {
    navigation.navigate('Account');
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
            <Logo width={40} height={40} fonsSize={20} marginTop={-4} />
          </View>
        </View>

        {/* 사용자 피드 리스트 영역 */}

        {!feedList.length && (
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
        )}

        {!!feedList.length &&
          feedList.map(el => (
            <View key={el.id}>
              {/* 피드 작성자 정보 */}
              <TouchableOpacity
                style={styles.profileArea}
                onPress={() => clickProfile(el.email)}>
                <Image
                  source={require('../../assets/images/basicUser.png')}
                  style={styles.profileImage}
                />

                <Text style={styles.profileNickname}>{el.nickname}</Text>
              </TouchableOpacity>

              {/* 피드 사진 */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Feed', {id: el.id})}>
                <Image
                  source={{uri: `http://13.209.27.220:8080${el.images[0]}`}}
                  style={styles.thumbImage}
                />

                {/* 피드 아이콘 영역 */}
                <View style={styles.iconArea}>
                  <FeedChatSvg color="#555" width={24} height={24} />
                  <Text style={styles.comment}>댓글 {el.replys.length}개</Text>
                  <EmotionGoodSvg color="#555" width={24} height={24} />
                  <Text style={styles.comment}>
                    감정 표현 {el.emotions.total}개
                  </Text>
                </View>

                {/* 피드 컨텐츠 영역 */}
                <View>
                  <Text style={styles.feedContent} numberOfLines={1}>
                    {el.content}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
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
    paddingBottom: 12,
  },
  profileArea: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 100,
  },
  profileNickname: {
    fontFamily: 'GmarketSansTTFMedium',
    paddingLeft: 12,
  },
  thumbImage: {
    width: screenWidth,
    height: screenWidth,
    borderWidth: 0.5,
    borderColor: '#ddd',
    marginLeft: -8,
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
  iconArea: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  feedContent: {
    fontFamily: 'GmarketSansTTFMedium',
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 20,
  },
  comment: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 12,
    padding: 4,
    color: '#555',
  },
});

export default Home;
