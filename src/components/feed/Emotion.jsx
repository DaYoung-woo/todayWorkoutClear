import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import EmotionGoodSvg from '../../assets/icons/emoticonGood.svg';
import EmotionFunnySvg from '../../assets/icons/emoticonFunny.svg';
import EmotionAngrySvg from '../../assets/icons/emoticonAngry.svg';
import EmotionSadSvg from '../../assets/icons/emoticonSad.svg';
import EmotionSurpriseSvg from '../../assets/icons/emoticonSurprise.svg';
import {updateFeedEmotion} from '../../api';

const Emotion = ({loadFeedDetail, id, emotions}) => {
  // 피드 감정 표현 api
  const changeEmotion = async emotionType => {
    try {
      await updateFeedEmotion(id, emotionType);
      loadFeedDetail();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.emotionContainer}>
      <View style={styles.emotionWrapper}>
        <TouchableOpacity onPress={() => changeEmotion('FUNNY')}>
          <EmotionFunnySvg
            color={emotions.emotionCheck === 'FUNNY' ? '#555' : '#aaa'}
            width={32}
            height={32}
          />
        </TouchableOpacity>
        <Text style={styles.emotionText}>웃겨요</Text>
        <Text style={styles.emotionCount}>{emotions.funny}</Text>
      </View>
      <View style={styles.emotionWrapper}>
        <TouchableOpacity
          onPress={() => changeEmotion('SURPRISE')}
          style={styles.emotionSvg}>
          <EmotionSurpriseSvg
            color={emotions.emotionCheck === 'SURPRISE' ? '#555' : '#aaa'}
            width={32}
            height={32}
          />
        </TouchableOpacity>
        <Text style={styles.emotionText}>놀라워요</Text>
        <Text style={styles.emotionCount}>{emotions.surprise}</Text>
      </View>
      <View style={styles.emotionWrapper}>
        <TouchableOpacity onPress={() => changeEmotion('GOOD')}>
          <EmotionGoodSvg
            color={emotions.emotionCheck === 'GOOD' ? '#555' : '#aaa'}
            width={32}
            height={32}
          />
        </TouchableOpacity>
        <Text style={styles.emotionText}>좋아요</Text>
        <Text style={styles.emotionCount}>{emotions.good}</Text>
      </View>
      <View style={styles.emotionWrapper}>
        <TouchableOpacity onPress={() => changeEmotion('SAD')}>
          <EmotionSadSvg
            color={emotions.emotionCheck === 'SAD' ? '#555' : '#aaa'}
            width={32}
            height={32}
          />
        </TouchableOpacity>
        <Text style={styles.emotionText}>슬퍼요</Text>
        <Text style={styles.emotionCount}>{emotions.sad}</Text>
      </View>
      <View style={styles.emotionWrapper}>
        <TouchableOpacity onPress={() => changeEmotion('ANGRY')}>
          <EmotionAngrySvg
            color={emotions.emotionCheck === 'ANGRY' ? '#555' : '#aaa'}
            width={32}
            height={32}
          />
        </TouchableOpacity>
        <Text style={styles.emotionText}>화나요</Text>
        <Text style={styles.emotionCount}>{emotions.angry}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
export default Emotion;
