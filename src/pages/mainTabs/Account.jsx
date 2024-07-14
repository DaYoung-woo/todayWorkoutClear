import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {accountInfoDetail} from '../../api';
import {ScrollView} from 'react-native-gesture-handler';
import NoFeedSvg from '../../assets/icons/noFeed.svg';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns;

// 피드가 하나도 없을 경우
const FeedListEmpty = () => {
  return (
    <View style={styles.feedListEmpty}>
      <NoFeedSvg
        style={styles.noFeedIcon}
        color="#ddd"
        width={42}
        height={48}
      />
      <Text style={styles.noFeenMsg}>
        {'피드가 비어 있습니다. \n첫 피드를 올려보세요!'}
      </Text>
    </View>
  );
};

const FeeListExist = ({feedList}) => {
  feedList.forEach(element => {
    console.log(element.images[0]);
  });
  return (
    <View style={styles.feedListContainer}>
      <View style={styles.row}>
        {feedList.map(item => {
          return (
            <View key={item.id}>
              <Image
                source={{uri: `http://13.209.27.220:8080${item.images[0]}`}}
                style={styles.image}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Account = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* 이메일 topbar */}
        <View style={styles.topbar}>
          <Text style={styles.accountEmail}>{accountInfo.email}</Text>
        </View>

        {/* 사용자 정보 */}
        <View style={styles.profile}>
          {/* 사용자 프로필 */}
          <View style={{textAlign: 'center'}}>
            <Image
              source={
                accountInfo?.profileImagePath ||
                require('../../assets/images/basicUser.png')
              }
              style={styles.profileImage}
            />
            <Text style={styles.nickName}>{accountInfo.nickName}</Text>
          </View>

          {/* 피드, 팔로우, 팔로워 */}
          <View style={styles.accountInfoContainer}>
            <View style={styles.accountInfoItem}>
              <Text style={styles.accountInfoItemCount}>{feedList.length}</Text>
              <Text style={styles.accountInfoItemLabel}>피드</Text>
            </View>
            <View style={styles.accountInfoItem}>
              <Text style={styles.accountInfoItemCount}>
                {accountInfo.followingCount}
              </Text>
              <Text style={styles.accountInfoItemLabel}>팔로잉</Text>
            </View>
            <View style={styles.accountInfoItem}>
              <Text style={styles.accountInfoItemCount}>
                {accountInfo.followerCount}
              </Text>
              <Text style={styles.accountInfoItemLabel}>팔로워</Text>
            </View>
          </View>
        </View>

        {/* 자기소개 */}
        <View style={styles.introduceContainer}>
          <TouchableOpacity>
            <Text style={styles.noIntroduce}>
              {accountInfo.introduce ||
                '아직 소개글이 없네요. 자신을 표현해보세요!'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 피드 리스트 */}
        {feedList.length ? (
          <FeeListExist feedList={feedList} />
        ) : (
          <FeedListEmpty />
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
  topbar: {
    padding: 16,
  },
  accountEmail: {
    fontFamily: 'GmarketSansTTFMedium',
    paddingBottom: 8,
    fontSize: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  profile: {flexDirection: 'row', paddingHorizontal: 16},
  accountInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  accountInfoItemLabel: {
    fontFamily: 'GmarketSansTTFMedium',
    textAlign: 'center',
    marginTop: 8,
    color: '#999',
  },
  accountInfoItemCount: {
    fontFamily: 'GmarketSansTTFMedium',
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  nickName: {
    paddingTop: 8,
    fontFamily: 'GmarketSansTTFMedium',
    textAlign: 'center',
  },
  feedListEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFeenMsg: {
    fontFamily: 'GmarketSansTTFMedium',
    fontWeight: 'semibold',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
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
  image: {
    width: imageSize,
    height: imageSize,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  feedListContainer: {
    marginTop: 16,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    margin: 1,
    height: imageSize,
    width: imageSize,
  },
});
export default Account;
