import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* 로고 */}
      <View style={styles.logoArea}>
        <Image
          source={require('../assets/icons/logo.png')}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>오운완</Text>
      </View>

      {/* 아이디 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>아이디</Text>
        <TextInput
          onChangeText={setId}
          value={id}
          style={styles.textInput}
          placeholder="아이디"
        />
        <Text style={styles.errorMsg}>비밀번호가 일치하지 않습니다.</Text>
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
        <Text style={styles.errorMsg}>비밀번호가 일치하지 않습니다.</Text>
      </View>

      <View style={styles.wrapper}>
        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginBtn}>
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
    marginTop: -8,
  },
  logoText: {
    fontFamily: 'GamjaFlower-Regular',
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
