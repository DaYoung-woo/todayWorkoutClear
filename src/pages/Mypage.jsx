import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getAccountInfoApi, updateAccountInfo} from '../api';
import Toast from 'react-native-toast-message';
import Input from '../components/common/Input';
import {getNicknameValid} from '../utils/valid';
import PrimaryBtn from '../components/common/PrimaryBtn';
const Mypage = ({navigation}) => {
  const [submit, setSubmit] = useState(false);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    loadAccountInfoDetail();
  }, []);

  // 사용자 정보
  const loadAccountInfoDetail = async () => {
    try {
      const res = await getAccountInfoApi();
      const {nickName, introduce, profileImagePath} = res.data.result;
      setNickname(nickName);
      setContent(introduce || '');
      setProfile(profileImagePath || '');
    } catch (e) {
      console.log(e);
    }
  };

  // 정보 수정 버튼 클릭
  const sumbitForm = () => {
    setSubmit(true);
    if (nickname.length > 1) {
      upateUserInfo();
    }
  };

  // 사용자 정보 업데이트
  const upateUserInfo = async () => {
    try {
      const params = {
        nickname: {value: nickname},
        name: '',
        introduce: content,
      };
      await updateAccountInfo(params);

      Toast.show({type: 'success', text1: '회원 정보 변경이 완료되었습니다.'});
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* 프로필 이미지 */}
      <View style={styles.profileWrapper}>
        <Image
          source={profile || require('../assets/images/basicUser.png')}
          style={styles.profile}
        />
      </View>

      {/* 닉네임 */}
      <View style={styles.wrapper}>
        <Input
          value={nickname}
          setValue={setNickname}
          submit={submit}
          valid={getNicknameValid(nickname)}
          label="닉네임"
          secureTextEntry={false}
        />
      </View>

      {/* 자기소개 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>자기소개</Text>
        <TextInput
          style={[styles.textareaHeight, styles.textInput]}
          multiline={true}
          numberOfLines={10}
          placeholder={'아직 소개글이 없네요. 자신을 표현해보세요!'}
          value={content}
          onChangeText={setContent}
        />
      </View>

      {/* 정보 수정 버튼 */}
      <View style={styles.wrapper}>
        <PrimaryBtn onPress={sumbitForm} label="정보 수정" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  profileWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  profile: {
    width: 120,
    height: 120,
  },
  textInputLabel: {
    fontFamily: 'GmarketSansTTFMedium',
    paddingBottom: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
  },
  textInput: {
    fontFamily: 'GmarketSansTTFMedium',
    borderWidth: 1,
    width: '100%',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#aaa',
  },
  textareaHeight: {
    height: 150,
  },
  registBtn: {
    backgroundColor: '#2E8CF4',
    alignItems: 'center',
    borderRadius: 5,
    padding: 16,
    marginTop: 20,
  },
  registBtnText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Mypage;
