import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {loginApi} from '../api';
import Toast from 'react-native-toast-message';
import {saveCookieStorage} from '../utils/helpers';
import {getEmailValid, getPasswordValid} from '../utils/valid';
import PrimaryBtn from '../components/common/PrimaryBtn';
import Input from '../components/common/Input';
import Logo from '../components/common/Logo';
import TextBtn from '../components/common/TextBtn';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSumbit] = useState(false);

  // 로그인 버튼 클릭 이벤트
  const sumbitForm = () => {
    setSumbit(true);
    if (getEmailValid(email) || getPasswordValid(password)) {
      return;
    }

    loginUser();
  };

  // 로그인 api 요청
  const loginUser = async () => {
    try {
      const param = {email, password};
      const res = await loginApi(param);

      // 쿠키 저장 후 홈화면으로 이동
      saveCookieStorage(res);
      navigation.navigate('Main');
    } catch (e) {
      console.log(e?.response);
      const text = e?.response?.data?.message || '에러가 발생했습니다.';
      Toast.show({type: 'error', text1: text});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoArea}>
        <Logo height={60} width={60} fonsSize={32} />
      </View>

      {/* 이메일 */}
      <View style={styles.wrapper}>
        <Input
          value={email}
          setValue={setEmail}
          submit={submit}
          valid={getEmailValid(email)}
          label="이메일"
          secureTextEntry={false}
        />
      </View>

      {/* 비밀번호 */}
      <View style={styles.wrapper}>
        <Input
          value={password}
          setValue={setPassword}
          submit={submit}
          valid={getPasswordValid(password)}
          label="비밀번호"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.wrapper}>
        {/* 로그인 버튼 */}
        <PrimaryBtn label="로그인" onPress={sumbitForm} />

        {/* 회원가입 버튼 */}
        <TextBtn
          label={'회원가입'}
          onPress={() => navigation.navigate('Regist')}
        />
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  logoArea: {
    marginTop: 40,
    marginBottom: 20,
  },
  registBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  registBtnText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#2E8CF4',
    fontSize: 16,
    fontWeight: 'semibold',
  },
});

export default Login;
