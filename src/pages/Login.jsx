import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginApi, setCookie} from '../api';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSumbit] = useState(false);

  const sumbitForm = () => {
    setSumbit(true);
    if (!email.length || !password.length) {
      return;
    }

    loginUser();
  };

  const loginUser = async () => {
    try {
      const param = {
        email,
        password,
      };
      const res = await loginApi(param);

      // 쿠키 저장 후 홈화면으로 이동
      saveCookieStorage(res);
      navigation.navigate('Home');
    } catch (e) {
      const text = e?.response?.data?.message || '에러가 발생했습니다.';
      Toast.show({
        type: 'error',
        text1: text,
      });
      console.log(e?.response?.data);
      console.log(e.reponse.status);
    }
  };

  const saveCookieStorage = async res => {
    const [cookie] = res.headers['set-cookie'];
    setCookie(JSON.stringify(cookie));
    try {
      await AsyncStorage.setItem('cookie', JSON.stringify(cookie));
      console.log(cookie);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoArea}>
        <Image
          source={require('../assets/icons/arm.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>오운완</Text>
      </View>

      {/* 이메일 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>이메일</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={styles.textInput}
          placeholder="이메일"
        />
        <Text style={styles.errorMsg}>
          {submit && !email.length && '이메일을 입력해주세요'}
        </Text>
      </View>

      {/* 비밀번호 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>비밀번호</Text>
        <TextInput
          secureTextEntry={true}
          allowFontScaling={false}
          onChangeText={setPassword}
          value={password}
          style={styles.textInput}
          placeholder="비밀번호"
          password
        />
        <Text style={styles.errorMsg}>
          {submit && !password.length && '비밀번호를 입력해주세요'}
        </Text>
      </View>

      <View style={styles.wrapper}>
        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginBtn} onPress={sumbitForm}>
          <Text style={styles.loginBtnText}>로그인</Text>
        </TouchableOpacity>

        {/* 회원가입 버튼 */}
        <View style={styles.registBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('Regist')}>
            <Text style={styles.registBtnText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  logoArea: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoIcon: {
    height: 60,
    width: 60,
    marginTop: -14,
  },
  logoText: {
    fontFamily: 'JalnanGothicTTF',
    fontSize: 32,
    color: '#2E8CF4',
  },
  textInputLabel: {
    fontFamily: 'NotoSansKR-VariableFont_wght',
    paddingBottom: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
  },
  textInput: {
    fontFamily: 'NotoSansKR-VariableFont_wght',
    borderWidth: 1,
    width: '100%',
    padding: 12,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#aaa',
  },
  errorMsg: {
    color: 'red',
    paddingTop: 4,
    height: 24,
    marginLeft: 2,
  },
  loginBtn: {
    backgroundColor: '#2E8CF4',
    alignItems: 'center',
    borderRadius: 5,
    padding: 16,
    marginTop: 12,
  },
  loginBtnText: {
    fontFamily: 'NotoSansKR-VariableFont_wght',
    fontSize: 16,
    fontWeight: 'bold',

    color: '#fff',
  },
  registBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  registBtnText: {
    color: '#2E8CF4',
    fontSize: 16,
    fontWeight: 'semibold',
  },
});

export default Login;
