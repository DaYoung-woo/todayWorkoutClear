import React, {useState} from 'react';
import {Text, View, TextInput, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {login as styles} from '../styles';
import {loginApi} from '../api';
import Toast from 'react-native-toast-message';
import {saveCookieStorage} from '../utils/helpers';
import {getEmailValid} from '../utils/valid';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSumbit] = useState(false);

  // 로그인 버튼 클릭 이벤트
  const sumbitForm = () => {
    setSumbit(true);
    if (!getEmailValid(email) || !password.length) {
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
      const text = e?.response?.data?.message || '에러가 발생했습니다.';
      Toast.show({type: 'error', text1: text});
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
        <Text style={styles.errorMsg}>{submit && getEmailValid(email)}</Text>
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

export default Login;
