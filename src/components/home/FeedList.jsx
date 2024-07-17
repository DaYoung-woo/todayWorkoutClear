import React from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import FeedChatSvg from '../../assets/icons/feedChat.svg';
import EmotionGoodSvg from '../../assets/icons/emoticonGood.svg';

const screenWidth = Dimensions.get('window').width;

const FeedList = ({feedList, clickProfile}) => {
  const navigation = useNavigation();
  return feedList.map(el => (
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
          <Text style={styles.comment}>감정 {el.emotions.total}개</Text>
        </View>

        {/* 피드 컨텐츠 영역 */}
        <View>
          <Text style={styles.feedContent} numberOfLines={1}>
            {el.content}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  ));
};

const styles = StyleSheet.create({
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
  },
  iconArea: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  feedContent: {
    fontFamily: 'GmarketSansTTFMedium',
    marginBottom: 32,
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  comment: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 12,
    padding: 4,
    color: '#555',
  },
});
export default FeedList;
