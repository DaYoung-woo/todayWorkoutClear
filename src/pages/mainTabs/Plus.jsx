import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CameraSvg from '../../assets/icons/camera.svg';
import ImagePicker from 'react-native-image-crop-picker';
import {addFeedListApi} from '../../api';

const Plus = ({navigation, state}) => {
  const [content, setContent] = useState('');
  const [imageList, setImageList] = useState([]);

  // 이미지 선택
  const selectImage = async () => {
    try {
      const res = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: true,
        maxFiles: 5 - imageList.length,
      });

      const images = [...imageList];
      res.forEach(el => {
        images.push({
          id: Math.random(),
          image: el,
        });
      });

      console.log(res);

      setImageList(images);
    } catch (e) {
      console.log(e);
    }
  };

  // 선택한 이미지 제거
  const removeImg = id => {
    setImageList(prev => prev.filter(el => el.id !== id));
  };

  // 해시태그 추출
  const extractHashtags = () => {
    // 해시태그 패턴 정의
    const pattern = /#(\S+?)(?=\s|#|$)/g;
    let matches;
    let hashtags = [];
    // 정규 표현식으로 매칭되는 모든 부분을 찾음
    while ((matches = pattern.exec(content)) !== null) {
      hashtags.push(matches[1]);
    }
    return hashtags;
  };

  // 게시글 생성 api 요청
  const saveFeed = async () => {
    try {
      const formData = new FormData();
      const feedRequest = JSON.stringify({
        content: content,
        tags: extractHashtags(content),
      });
      console.log(feedRequest);

      formData.append('feedRequest', feedRequest);

      imageList.forEach(el => {
        const image = {
          uri: el.image.path,
          type: el.image.mime,
          name: `image_${el.image.path.substring(
            el.image.path.indexOf('picker/') + 7,
          )}`,
        };

        formData.append('image', image);
      });

      const res = await addFeedListApi(formData);

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  // 선택 한 이미지들 미리보기
  const renderImages = item => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => removeImg(item.id)}
          style={styles.deleteImageIconArea}>
          <Image
            source={require('../../assets/icons/close.png')}
            style={styles.deleteImageIcon}
          />
        </TouchableOpacity>
        <View>
          <Image
            source={{uri: item.image?.path}}
            width={90}
            height={90}
            keyExtractor={item.id}
            style={styles.imagePreviewItem}
          />
        </View>
      </View>
    );
  };

  //
  return (
    <SafeAreaView style={styles.container}>
      {/* 게시물 생성 바 */}
      <View style={styles.titleArea}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.closeIcon}
            source={require('../../assets/icons/close.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>게시물 생성</Text>
        <TouchableOpacity
          disabled={!imageList.length || !content}
          onPress={saveFeed}>
          <Text
            style={
              !imageList.length || !content
                ? styles.disalbledBtn
                : styles.completeBtn
            }>
            완료
          </Text>
        </TouchableOpacity>
      </View>

      {/* 게시글 입력칸 */}
      <TextInput
        style={styles.textarea}
        multiline={true}
        numberOfLines={10}
        placeholder={'해시태그(#)를 사용하여 피드에 태그를 추가해 보세요.'}
        value={content}
        onChangeText={setContent}
      />

      {/* 이미지 영역 */}
      <View style={styles.photoArea}>
        <FlatList
          data={imageList}
          renderItem={({item}) => renderImages(item)}
          keyExtractor={item => item.id}
          style={styles.imagePreviewList}
          ListHeaderComponent={
            <TouchableOpacity
              style={styles.photoAddBox}
              onPress={() => selectImage()}
              disabled={imageList.length > 4}>
              <CameraSvg
                width={44}
                height={44}
                color={imageList.length > 4 ? '#ddd' : '#888'}
              />
            </TouchableOpacity>
          }
          horizontal
        />
        <Text style={styles.errorMsg}>
          사진은 최대 5장까지 등록 가능합니다.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    flex: 1,
  },
  titleArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  title: {
    fontFamily: 'GmarketSansTTFMedium',
    fontWeight: 'semibold',
    fontSize: 16,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  completeBtn: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#2E8CF4',
    fontSize: 16,
  },
  disalbledBtn: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#555',
    fontSize: 16,
  },
  textarea: {
    height: 250,
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    fontSize: 16,
    fontFamily: 'GmarketSansTTFMedium',
  },
  photoArea: {
    paddingVertical: 12,
  },
  photoAddBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreviewList: {
    marginHorizontal: 8,
  },
  imagePreviewItem: {
    marginLeft: 8,
    borderRadius: 10,
    width: 88,
    height: 88,
  },
  errorMsg: {
    fontFamily: 'GmarketSansTTFMedium',
    margin: 8,
    color: '#2e8cf4',
  },
  deleteImageIconArea: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  deleteImageIcon: {
    width: 12,
    height: 12,
    margin: 1,
  },
});

export default Plus;
