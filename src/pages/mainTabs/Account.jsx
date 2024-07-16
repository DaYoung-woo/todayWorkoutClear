import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import {accountInfoDetail} from '../../api';
import {saveUserInfo} from '../../utils/helpers';
import NoFeed from '../../components/common/NoFeed';
import FeedGallery from '../../components/common/FeedGallery';
import Profile from '../../account/Profile';
import Introduce from '../../components/mypage/Introduce';

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
        <Introduce
          nickName={accountInfo.nickName}
          introduce={accountInfo.introduce}
        />

        {/* 피드 리스트 */}
        {feedList.length ? (
          <FeedGallery feedList={feedList} />
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
});
export default Account;
