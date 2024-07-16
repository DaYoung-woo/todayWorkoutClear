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

import NoFeed from '../../components/common/NoFeed';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns;

// 피드 정렬을 위한 row 세팅
const renderRow = (rowData, rowIndex) => (
  <View key={rowIndex} style={styles.row}>
    {rowData.map(item => (
      <View key={item.id} style={styles.item}>
        <Image
          source={{uri: `http://13.209.27.220:8080${item.images[0]}`}}
          style={styles.image}
        />
      </View>
    ))}
  </View>
);

// 피드 정렬을 위한 column 세팅
const groupPhotosInRows = (photos, numColumns) => {
  const rows = [];
  for (let i = 0; i < photos.length; i += numColumns) {
    rows.push(photos.slice(i, i + numColumns));
  }
  return rows;
};

//피드 리스트가 존재하는 경우
const FeeListExist = ({feedList}) => {
  const rows = groupPhotosInRows(feedList, numColumns);
  return (
    <View style={styles.feedListContainer}>
      {rows.map((item, idx) => {
        return renderRow(item, idx);
      })}
    </View>
  );
};

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
          <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
            <View style={{textAlign: 'center'}}>
              <Image
                source={
                  accountInfo?.profileImagePath ||
                  require('../../assets/images/basicUser.png')
                }
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>

          {/* 피드, 팔로우, 팔로워 */}
          <View style={styles.accountInfoContainer}>
            <View style={styles.accountInfoItem}>
              <Text style={styles.accountInfoItemCount}>{feedList.length}</Text>
              <Text style={styles.accountInfoItemLabel}>피드</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Follow')}>
              <View style={styles.accountInfoItem}>
                <Text style={styles.accountInfoItemCount}>
                  {accountInfo.followingCount}
                </Text>
                <Text style={styles.accountInfoItemLabel}>팔로잉</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Follow')}>
              <View style={styles.accountInfoItem}>
                <Text style={styles.accountInfoItemCount}>
                  {accountInfo.followerCount}
                </Text>
                <Text style={styles.accountInfoItemLabel}>팔로워</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 자기소개 */}
        <View style={styles.introduceContainer}>
          <Text style={styles.nickName}>{accountInfo.nickName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
            <Text style={styles.noIntroduce}>
              {accountInfo.introduce ||
                '아직 소개글이 없네요. 자신을 표현해보세요!'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 피드 리스트 */}
        {feedList.length ? (
          <View style={{flex: 1}}>
            <FeeListExist feedList={feedList} />
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
  topbar: {
    padding: 16,
  },
  accountEmail: {
    fontFamily: 'GmarketSansTTFMedium',
    paddingBottom: 8,
    fontSize: 16,
  },
  profileImage: {
    width: 88,
    height: 88,
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

  feedListContainer: {
    marginTop: 16,
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
});
export default Account;
