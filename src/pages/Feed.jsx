import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {addCommentApi, addFollowing, getFeedDetail} from '../api';

import Comment from '../components/feed/Comment';
import Emotion from '../components/feed/Emotion';
import InputWithBtn from '../components/common/InputWithBtn';
import TagViewRender from '../components/feed/TagViewRender';
import ImageCarousel from '../components/feed/ImageCarousel';
import ConfirmModal from '../components/common/ConfirmModal';

const screenWidth = Dimensions.get('window').width;

const Feed = ({route}) => {
  const {id} = route.params;
  const [comment, setComment] = useState('');
  const [confirmModalShow, setConfirmModalShow] = useState(false);
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
      console.log(res.data.result);
      setFeed(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  // 댓글 작성 전 유효성 검사
  const submitForm = () => {
    if (!comment.length) {
      Toast.show({type: 'error', text1: '댓글을 입력해주세요.'});
      return;
    }
    addComment();
  };

  // 댓글 작성
  const addComment = async () => {
    try {
      await addCommentApi(feed.id, comment);
      Toast.show({type: 'success', text1: '댓글을 등록했습니다.'});
      loadFeedDetail();
      setComment('');
    } catch (e) {
      console.log(e);
    }
  };

  const openFollowModal = () => {
    setConfirmModalShow(true);
  };
  const onPressNo = () => {
    setConfirmModalShow(false);
  };
  const onPressYes = async () => {
    try {
      const res = await addFollowing({
        email: feed.email,
      });
      Toast.show({
        type: 'success',
        text1: `${feed.nickname}님을 팔로우 합니다.`,
      });
      console.log(res);
    } catch (e) {
      console.log(e?.response?.data);
    }
    setConfirmModalShow(false);
  };

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
        <ImageCarousel images={feed.images} />
      ) : (
        <Image
          source={{uri: `http://13.209.27.220:8080${feed.images[0]}`}}
          style={{height: screenWidth, width: screenWidth}}
        />
      )}

      {/* content 영역 */}
      <TagViewRender content={feed.content} />

      {/* 감정 표현 영역 */}
      <Emotion
        loadFeedDetail={loadFeedDetail}
        emotions={feed.emotions}
        id={feed.id}
      />

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
      <ConfirmModal
        isShow={confirmModalShow}
        question={`${feed.nickname}님을 팔로우하시겠습니까?`}
        yesMsg="네"
        noMsg="아니오"
        onPressNo={onPressNo}
        onPressYes={onPressYes}
      />
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
  commentContainer: {
    marginTop: 32,
    marginHorizontal: 4,
  },
  commentEmptyText: {
    fontFamily: 'GmarketSansTTFMedium',
    textAlign: 'center',
    paddingTop: 24,
    paddingBottom: 48,
    color: '#aaa',
    marginBottom: 24,
  },
});

export default Feed;
