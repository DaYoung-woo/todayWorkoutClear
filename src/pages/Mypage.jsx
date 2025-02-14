import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Input from '../components/common/Input';
import {getAccountInfoApi, logoutApi, updateAccountInfo} from '../api';
import {getNicknameValid} from '../utils/valid';
import PrimaryBtn from '../components/common/PrimaryBtn';
import Profile from '../components/mypage/Profile';
import {saveUserInfo, setCookie} from '../utils/helpers';
import TextBtn from '../components/common/TextBtn';

const Mypage = ({navigation}) => {
  const [submit, setSubmit] = useState(false);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    loadAccountInfoDetail();
  }, []);

  useEffect(() => {
    saveUserInfo({
      nickname,
      profile,
      content,
    });
  }, [nickname, profile, content]);

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
      saveUserInfo({
        nickName: nickname,
        introduce: content,
        profileImagePath: profile,
      });
      Toast.show({type: 'success', text1: '회원 정보 변경이 완료되었습니다.'});
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await logoutApi();
      setCookie();
      navigation.navigate('Login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* 프로필 이미지 */}
      <Profile profile={profile} setProfile={setProfile} />

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

      <View style={styles.wrapper}>
        <PrimaryBtn onPress={sumbitForm} label="정보 수정" />
        <TextBtn label="로그아웃" onPress={logout} />
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
  profileContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  profileWrapper: {},
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ddd',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  profile: {
    width: 120,
    height: 120,
  },
});

export default Mypage;
