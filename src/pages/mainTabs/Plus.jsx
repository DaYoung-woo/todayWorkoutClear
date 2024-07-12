import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PlusSvg from '../../assets/icons/plus.svg';

const Plus = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
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

      <TextInput
        style={styles.textarea}
        multiline={true}
        numberOfLines={10}
        placeholder="내용을 입력해주세요"
      />

      <View style={styles.photoArea}>
        <TouchableOpacity style={styles.photoAddBox}>
          <PlusSvg width={44} height={44} color={'#555'} />
        </TouchableOpacity>
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
    padding: 12,
    flexDirection: 'row',
  },
  photoAddBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Plus;
