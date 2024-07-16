import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {registApi} from '../api';
import {
  getEmailValid,
  getPasswordValid,
  getPasswordCheckValid,
  getNicknameValid,
  reigstValid,
  getPhoneNumberValid,
} from '../utils/valid';
import Input from '../components/common/Input';
import PrimaryBtn from '../components/common/PrimaryBtn';

const Regist = ({navigation}) => {
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    password: '',
    passwordCheck: '',
    email: '',
    phoneNumber: '',
    nickname: '',
  });

  // 회원가입 전 유효성 검사 확인하고 회원가입 api 요청
  const sumbitForm = () => {
    setSubmit(true);
    if (!reigstValid(form)) {
      return;
    }

    registUser();
  };

  const registUser = async () => {
    try {
      // api 요청
      const param = {...form};
      delete param.passwordCheck;
      await registApi(param);

      // 회원 가입 성공 후 이동
      Toast.show({type: 'success', text1: '회원가입이 완료되었습니다.'});
      navigation.navigate('Login');
    } catch (e) {
      const text1 =
        e?.response?.data?.errors[0]?.reason ||
        '작성하신 내용을 다시 확인해주세요.';
      Toast.show({
        type: 'error',
        text1,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 이메일 */}
      <View style={styles.wrapper}>
        <Input
          value={form.email}
          setValue={email => setForm({...form, email})}
          submit={submit}
          valid={getEmailValid(form.email)}
          label="이메일"
          secureTextEntry={false}
        />
      </View>

      {/* 비밀번호 */}
      <View style={styles.wrapper}>
        <Input
          value={form.password}
          setValue={password => setForm({...form, password})}
          submit={submit}
          valid={getPasswordValid(form.password)}
          label="비밀번호"
          secureTextEntry={true}
        />
      </View>

      {/* 비밀번호 확인 */}
      <View style={styles.wrapper}>
        <Input
          value={form.passwordCheck}
          setValue={passwordCheck => setForm({...form, passwordCheck})}
          submit={submit}
          valid={getPasswordCheckValid(form.password, form.passwordCheck)}
          label="비밀번호 확인"
          secureTextEntry={true}
        />
      </View>

      {/* 닉네임 */}
      <View style={styles.wrapper}>
        <Input
          value={form.nickname}
          setValue={nickname => setForm({...form, nickname})}
          submit={submit}
          valid={getNicknameValid(form.nickname)}
          label="닉네임"
          secureTextEntry={false}
        />
      </View>

      {/* 전화번호 */}
      <View style={styles.wrapper}>
        <Input
          value={form.phoneNumber}
          setValue={phoneNumber => {
            if (/^\d+$/.test(phoneNumber)) {
              setForm({...form, phoneNumber});
            }
          }}
          submit={submit}
          valid={getPhoneNumberValid(form.phoneNumber)}
          label="전화번호"
          secureTextEntry={false}
        />
      </View>

      {/* 회원가입 버튼 */}
      <View style={styles.wrapper}>
        <PrimaryBtn label="회원가입" onPress={sumbitForm} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});

export default Regist;
