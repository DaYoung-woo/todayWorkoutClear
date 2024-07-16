import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Modal} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {addCommentApi, getFeedDetail, updateFeedEmotion} from '../api';

import Comment from '../components/feed/Comment';
import InputWithBtn from '../components/common/InputWithBtn';
import Emotion from '../components/feed/Emotion';

const screenWidth = Dimensions.get('window').width;

// 캐러셀 이미지
const RenderFeedImage = ({images}) => {
  return (
    <View>
      <Carousel
        loop={true}
        autoPlay={false}
        style={{width: screenWidth, height: screenWidth}}
        width={screenWidth}
        height={screenWidth}
        data={images}
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

// 태그 분석 render
const TagViewRender = ({content}) => {
  const splitText = content.split(/(#[\w가-힣]+)/g).filter(el => !!el);
  //

  return (
    <Text style={styles.contentContainer}>
      {splitText.map(el =>
        el.split('').includes('#') ? (
          <Text style={styles.hashtagText} key={el}>
            {el}
          </Text>
        ) : (
          <Text style={styles.contentsText} key={el}>
            {el}
          </Text>
        ),
      )}
    </Text>
  );
};

const Feed = ({route}) => {
  const {id} = route.params;
  const [comment, setComment] = useState('');
  const [edit, setEdit] = useState(0);
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

  // 피드 상세 api 요청
  const loadFeedDetail = async () => {
    try {
      const res = await getFeedDetail(id);
      setFeed(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  // 피드 감정 표현 api
  const changeEmotion = async emotionType => {
    try {
      await updateFeedEmotion(feed.id, emotionType);
      loadFeedDetail();
    } catch (e) {
      console.log(e);
    }
  };

  // 댓글 작성 전 유효성 검사
  const submitForm = () => {
    if (!comment.length) {
      Toast.show({
        type: 'error',
        text1: '댓글을 입력해주세요.',
      });
      return;
    }
    addComment();
  };

  // 댓글 작성
  const addComment = async () => {
    try {
      await addCommentApi(feed.id, comment);
      Toast.show({
        type: 'success',
        text1: '댓글을 등록했습니다.',
      });
      loadFeedDetail();
      setComment('');
    } catch (e) {
      console.log(e);
    }
  };

  const openFollowModal = () => {};

  return (
    <ScrollView style={styles.container}>
      {/* 프로필 영역 */}
      <View style={styles.profile}>
        <TouchableOpacity onPress={openFollowModal}>
          {feed?.profileImagePath ? (
            <Image
              source={{
                uri: `http://13.209.27.220:8080${feed.profileImagePath}`,
              }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require('../assets/images/basicUser.png')}
              style={styles.profileImage}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.profileText}>{feed.nickname}</Text>
      </View>

      {/* 이미지 캐러셀 영역 */}
      {feed.images.length > 1 ? (
        <RenderFeedImage
          style={{height: screenWidth, width: screenWidth}}
          images={feed.images}
        />
      ) : (
        <Image
          source={{uri: `http://13.209.27.220:8080${feed.images[0]}`}}
          style={{height: screenWidth, width: screenWidth}}
        />
      )}

      {/* content 영역 */}
      <TagViewRender content={feed.content} />

      {/* 감정 표현 영역 */}
      <Emotion changeEmotion={changeEmotion} emotions={feed.emotions} />

      {/* 댓글 영역 */}
      <View style={styles.commentContainer}>
        <Text style={styles.profileText}>댓글{feed.replys.length}개</Text>
        <InputWithBtn
          value={comment}
          setValue={setComment}
          onPress={submitForm}
          label={'댓글'}
        />

        <View style={styles.commentList}>
          {feed.replys.length ? (
            <Comment feed={feed} />
          ) : (
            <Text style={styles.commentEmptyText}>
              아직 댓글이 없어요. 첫 댓글을 작성해보세요!
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
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
    borderRadius: 100,
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
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  contentContainer: {
    padding: 12,
    flexDirection: 'row',
  },

  contentsText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#555',
  },
  hashtagText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#2E8CF4',
  },
  commentContainer: {
    marginTop: 32,
    marginHorizontal: 4,
  },

  commentEmptyText: {
    fontFamily: 'GmarketSansTTFMedium',
    textAlign: 'center',
    paddingVertical: 24,
    color: '#aaa',
  },
});

export default Feed;
