import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Login = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>아이디</Text>
        <TextInput
          onChangeText={setId}
          value={id}
          style={styles.textInput}
          placeholder="아이디"
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>비밀번호</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.textInput}
          placeholder="비밀번호"
        />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[styles.loginBtn, !!id && !!password && styles.loginBtnAtive]}
          disabled={true}>
          <Text
            style={[
              styles.loginBtnText,
              !!id && !!password && styles.loginBtnTextActive,
            ]}>
            로그인
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registBtn}
          onPress={() => navigation.navigate('regist')}>
          <Text style={styles.registBtnText}>회원가입</Text>
        </TouchableOpacity>
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
    paddingTop: 8,
    paddingBottom: 16,
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
  loginBtn: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 5,
    padding: 16,
    marginTop: 12,
  },
  loginBtnAtive: {
    backgroundColor: '#2E8CF4',
  },
  loginBtnText: {
    fontFamily: 'NotoSansKR-VariableFont_wght',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  loginBtnTextActive: {
    color: '#fff',
  },
  registBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  registBtnText: {
    color: '#2E8CF4',
    fontSize: 14,
    fontWeight: 600,
  },
});

export default Login;
