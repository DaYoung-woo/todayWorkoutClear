import React, {useEffect, useState} from 'react';
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

const Plus = ({navigation, state}) => {
  const [feedRequest, setFeedRequest] = useState({content: '', tags: []});
  const [images, setImages] = useState([]);

  // 이미지 선택
  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const iamgeArr = [...images];
      const obj = {
        image,
        id: JSON.stringify(new Date()),
      };
      iamgeArr.push(obj);
      setImages(iamgeArr);
    });
  };

  // 선택한 이미지들 미리보기
  const renderImages = item => {
    return (
      <View>
        <TouchableOpacity onPress={() => {}} style={styles.deleteImageIconArea}>
          <Image
            source={require('../../assets/icons/close.png')}
            style={styles.deleteImageIcon}
          />
        </TouchableOpacity>
        <Image
          source={{uri: item.image?.path}}
          width={90}
          height={90}
          keyExtractor={item.id}
          style={styles.imagePreviewItem}
        />
      </View>
    );
  };

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
        <TouchableOpacity>
          <Text style={styles.completeBtn}>완료</Text>
        </TouchableOpacity>
      </View>

      {/* 게시글 입력칸 */}
      <TextInput
        style={styles.textarea}
        multiline={true}
        numberOfLines={10}
        placeholder="내용을 입력해주세요"
        value={feedRequest.content}
        onChangeText={content => setFeedRequest({...feedRequest, content})}
      />

      {/* 이미지 영역 */}
      <View style={styles.photoArea}>
        <FlatList
          data={images}
          renderItem={({item}) => renderImages(item)}
          keyExtractor={item => item.id}
          style={styles.imagePreviewList}
          ListHeaderComponent={
            <TouchableOpacity
              style={styles.photoAddBox}
              onPress={() => selectImage()}>
              <CameraSvg
                width={44}
                height={44}
                color={images.length > 4 ? '#ddd' : '#888'}
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
    paddingVertical: 24,
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
    fontFamily: 'NanumPenScript-Regular',
    fontWeight: 'semibold',
    fontSize: 16,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  completeBtn: {
    color: '#2E8CF4',
    fontSize: 16,
  },
  textarea: {
    height: 250,
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    fontSize: 16,
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
    margin: 8,
    color: '#2e8cf4',
  },
  deleteImageIconArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
  },
  deleteImageIcon: {
    width: 16,
    height: 16,
    margin: 4,
  },
});

export default Plus;
