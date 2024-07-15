import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {getFeedDetail} from '../api';

const screenWidth = Dimensions.get('window').width;

const Feed = ({route}) => {
  const {id} = route.params;
  const [feed, setFeed] = useState({
    content: '',
    emotions: {},
    id: '',
    images: [],
    nickname: '',
    profileImagePath: '',
    replys: [],
    tags: [],
  });

  useEffect(() => {
    loadFeedDetail();
  }, [id]);

  // 태그 분석 render
  const tagViewRender = () => {
    const contentArr = [];
  };

  // 피드 상세 api 요청
  const loadFeedDetail = async () => {
    try {
      const res = await getFeedDetail(id);
      setFeed(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  // 캐러셀 이미지
  const RenderFeedImage = () => {
    return (
      <View>
        <Carousel
          loop={true}
          autoPlay={false}
          style={{width: screenWidth, height: screenWidth}}
          width={screenWidth}
          height={screenWidth}
          data={feed.images}
          renderItem={({item}) => {
            return (
              <View>
                <Image
                  source={{uri: `http://13.209.27.220:8080${item}`}}
                  style={styles.thumbImage}
                />
                <Text>{item}</Text>
              </View>
            );
          }}
          scrollAnimationDuration={1200}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 프로필 영역 */}
      <View style={styles.profile}>
        {feed.profileImagePath ? (
          <Image
            source={{uri: `http://13.209.27.220:8080${feed.profileImagePath}`}}
            style={styles.profileImage}
          />
        ) : (
          <Image
            source={require('../assets/images/basicUser.png')}
            style={styles.profileImage}
          />
        )}
        <Text style={styles.profileText}>{feed.nickname}</Text>
      </View>

      {/* 이미지 영역 */}
      <RenderFeedImage />

      {/* content 영역 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
  },
  profileImage: {
    width: 52,
    height: 52,
  },
  profileText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#555',
    marginLeft: 8,
    fontSize: 16,
  },
  thumbImage: {
    width: screenWidth,
    height: screenWidth,
    borderWidth: 0.5,
    borderColor: '#ddd',
    marginLeft: -8,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default Feed;
