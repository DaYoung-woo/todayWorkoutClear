import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Toast from 'react-native-toast-message';
import Input from '../components/common/Input';
import {getAccountInfoApi, updateAccountInfo} from '../api';
import {getNicknameValid} from '../utils/valid';
import PrimaryBtn from '../components/common/PrimaryBtn';
import CameraSvg from '../assets/icons/camera.svg';

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
        <CameraSvg width={44} height={44} color="#555" />
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
        <Input
          value={content}
          setValue={setContent}
          submit={submit}
          valid={true}
          label={'아직 소개글이 없네요. 자신을 표현해보세요!'}
          secureTextEntry={false}
          placeholder={'자기소개'}
          multiline={true}
          numberOfLines={10}
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
  textareaHeight: {
    height: 150,
  },
  profile: {
    width: 120,
    height: 120,
  },
});

export default Mypage;
