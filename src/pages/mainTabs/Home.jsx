import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {feedListApi, getAccountInfoApi} from '../../api';
import {saveUserInfo} from '../../utils/helpers';
import Toast from 'react-native-toast-message';
import Logo from '../../components/common/Logo';
import NoFeed from '../../components/common/NoFeed';
import FeedList from '../../components/home/FeedList';

const Home = ({navigation, route}) => {
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', e => {
      // Do something
      console.log('test');
    });

    return unsubscribe;
  }, [navigation]);

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
        contentContainerStyle={styles.scrollAreaContainer}>
        {/* TopBar */}
        <View style={styles.topBar}>
          <Logo width={40} height={40} fonsSize={20} marginTop={-4} />
        </View>

        {/* 사용자 피드 리스트 영역 */}
        {!feedList.length ? (
          <NoFeed
            text={'피드가 비어 있습니다. \n팔로우할 친구를 찾아보세요!'}
          />
        ) : (
          <FeedList clickProfile={clickProfile} feedList={feedList} />
        )}
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
  scrollAreaContainer: {flexGrow: 1},
  topBar: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingBottom: 4,
    marginBottom: 12,
  },
});

export default Home;
