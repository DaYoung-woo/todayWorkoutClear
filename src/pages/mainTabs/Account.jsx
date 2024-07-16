import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {accountInfoDetail} from '../../api';
import {ScrollView} from 'react-native-gesture-handler';
import NoFeed from '../../components/common/NoFeed';
import FeedGallery from '../../components/common/FeedGallery';
import {saveUserInfo} from '../../utils/helpers';
import Profile from '../../account/Profile';

const Account = ({navigation}) => {
  const [accountInfo, setAccountInfo] = useState({});
  const [feedList, setFeedList] = useState([]);

  // 사용자 정보 api
  const loadAccountInfoDetail = async () => {
    try {
      const res = await accountInfoDetail();
      const {accountInfoResponse, feedList: feeds} = res.data.result;
      setAccountInfo(accountInfoResponse);
      setFeedList(feeds);
    } catch (e) {
      console.log(e?.response);
    }
  };

  useEffect(() => {
    loadAccountInfoDetail();
  }, []);

  useEffect(() => {
    saveUserInfo({
      nickName: accountInfo.nickName,
      introduce: accountInfo.introduce,
      profileImagePath: accountInfo.profileImagePath,
    });
  }, [accountInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* 이메일 */}
        <Text style={styles.accountEmail}>{accountInfo.email}</Text>

        {/* 사용자 프로필 */}
        <Profile
          profileImagePath={accountInfo?.profileImagePath}
          feed={feedList.length}
          following={accountInfo?.followingCount}
          follower={accountInfo?.followerCount}
        />

        {/* 자기소개 */}
        <View style={styles.introduceContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
            <Text style={styles.nickName}>{accountInfo.nickName}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
            <Text style={styles.noIntroduce}>
              {accountInfo.introduce ||
                '아직 소개글이 없네요. 자신을 표현해보세요!'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 피드 리스트 */}
        {feedList.length ? (
          <View style={styles.flex}>
            <FeedGallery feedList={feedList} />
          </View>
        ) : (
          <NoFeed text={'피드가 비어 있습니다. \n첫 피드를 올려보세요!'} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  accountEmail: {
    fontFamily: 'GmarketSansTTFMedium',
    paddingBottom: 8,
    fontSize: 16,
    padding: 16,
  },
  nickName: {
    paddingVertical: 8,
    fontFamily: 'GmarketSansTTFMedium',
  },
  introduceContainer: {
    marginVertical: 16,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  noIntroduce: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#999',
  },
  flex: {
    flex: 1,
  },
});
export default Account;
