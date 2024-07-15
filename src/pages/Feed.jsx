import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {addCommentApi, getFeedDetail, updateFeedEmotion} from '../api';
import EmotionGoodSvg from '../assets/icons/emoticonGood.svg';
import EmotionFunnySvg from '../assets/icons/emoticonFunny.svg';
import EmotionAngrySvg from '../assets/icons/emoticonAngry.svg';
import EmotionSadSvg from '../assets/icons/emoticonSad.svg';
import EmotionSurpriseSvg from '../assets/icons/emoticonSurprise.svg';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
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
      {splitText.map(el => {
        if (el.split('').includes('#')) {
          return (
            <Text style={styles.hashtagText} key={Math.random()}>
              {el}
            </Text>
          );
        } else {
          return (
            <Text style={styles.contentsText} key={Math.random()}>
              {el}
            </Text>
          );
        }
      })}
    </Text>
  );
};

const Feed = ({route}) => {
  const {id} = route.params;
  const [comment, setComment] = useState('');
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

  return (
    <ScrollView style={styles.container}>
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

      {/* 이미지 캐러셀 영역 */}
      <RenderFeedImage
        style={{height: screenWidth, width: screenWidth}}
        images={feed.images}
      />

      {/* content 영역 */}
      <TagViewRender content={feed.content} />

      {/* 감정 표현 영역 */}
      <View style={styles.emotionContainer}>
        <View style={styles.emotionWrapper}>
          <TouchableOpacity onPress={() => changeEmotion('FUNNY')}>
            <EmotionFunnySvg
              color={feed.emotions.emotionCheck === 'FUNNY' ? '#555' : '#aaa'}
              width={32}
              height={32}
            />
          </TouchableOpacity>
          <Text style={styles.emotionText}>웃겨요</Text>
          <Text style={styles.emotionCount}>{feed.emotions.funny}</Text>
        </View>
        <View style={styles.emotionWrapper}>
          <TouchableOpacity
            onPress={() => changeEmotion('SURPRISE')}
            style={styles.emotionSvg}>
            <EmotionSurpriseSvg
              color={
                feed.emotions.emotionCheck === 'SURPRISE' ? '#555' : '#aaa'
              }
              width={32}
              height={32}
            />
          </TouchableOpacity>
          <Text style={styles.emotionText}>놀라워요</Text>
          <Text style={styles.emotionCount}>{feed.emotions.surprise}</Text>
        </View>
        <View style={styles.emotionWrapper}>
          <TouchableOpacity onPress={() => changeEmotion('GOOD')}>
            <EmotionGoodSvg
              color={feed.emotions.emotionCheck === 'GOOD' ? '#555' : '#aaa'}
              width={32}
              height={32}
            />
          </TouchableOpacity>
          <Text style={styles.emotionText}>좋아요</Text>
          <Text style={styles.emotionCount}>{feed.emotions.good}</Text>
        </View>
        <View style={styles.emotionWrapper}>
          <TouchableOpacity onPress={() => changeEmotion('SAD')}>
            <EmotionSadSvg
              color={feed.emotions.emotionCheck === 'SAD' ? '#555' : '#aaa'}
              width={32}
              height={32}
            />
          </TouchableOpacity>
          <Text style={styles.emotionText}>슬퍼요</Text>
          <Text style={styles.emotionCount}>{feed.emotions.sad}</Text>
        </View>
        <View style={styles.emotionWrapper}>
          <TouchableOpacity onPress={() => changeEmotion('ANGRY')}>
            <EmotionAngrySvg
              color={feed.emotions.emotionCheck === 'ANGRY' ? '#555' : '#aaa'}
              width={32}
              height={32}
            />
          </TouchableOpacity>
          <Text style={styles.emotionText}>화나요</Text>
          <Text style={styles.emotionCount}>{feed.emotions.angry}</Text>
        </View>
      </View>

      {/* 댓글 영역 */}
      <View style={styles.commentContainer}>
        <Text style={styles.profileText}>댓글{feed.replys.length}개</Text>
        <View style={styles.commentEdit}>
          <TextInput
            style={styles.textInput}
            placeholder="댓글"
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.commentBtn} onPress={submitForm}>
            <Text style={styles.commentBtnText}>작성</Text>
          </TouchableOpacity>
        </View>
        {/* 댓글 리스트 */}
        <View style={styles.commentList}>
          {/* 댓글이 없는 경우 */}
          {!feed.replys.length && (
            <Text style={styles.commentEmptyText}>
              아직 댓글이 없어요. 첫 댓글을 작성해보세요!
            </Text>
          )}

          {/* 댓글이 있는 경우 */}
          {feed.replys.map(el => (
            <View style={styles.commentItem}>
              <Text style={styles.commentNickname}>{el.nickname}</Text>
              <Text style={styles.commentText}>{el.reply}</Text>
            </View>
          ))}
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
  emotionContainer: {
    flexDirection: 'row',
    marginHorizontal: 8,
    justifyContent: 'center',
    gap: 12,
  },
  emotionWrapper: {
    paddingTop: 20,
    textAlign: 'center',
  },
  emotionSvg: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    paddingTop: 4,
  },
  emotionCount: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 10,
    textAlign: 'center',
    paddingTop: 4,
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
  commentEdit: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingRight: 8,
  },
  commentBtn: {
    fontFamily: 'GmarketSansTTFMedium',
    backgroundColor: '#2E8CF4',
    borderRadius: 5,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  commentBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  textInput: {
    fontFamily: 'GmarketSansTTFMedium',
    borderWidth: 1,
    padding: 12,
    height: 44,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#aaa',
    marginVertical: 12,
    marginHorizontal: 8,
    flex: 1,
  },
  commentList: {
    padding: 8,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    paddingHorizontal: -4,
  },
  commentEmptyText: {
    fontFamily: 'GmarketSansTTFMedium',
    textAlign: 'center',
    paddingVertical: 24,
    color: '#aaa',
  },
  commentItem: {
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    padding: 12,
  },
  commentNickname: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#999',
  },
  commentText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#555',
    paddingVertical: 8,
  },
});

export default Feed;
