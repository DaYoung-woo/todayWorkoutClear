import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Regist = () => {
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    id: '',
    password: '',
    passwordCheck: '',
    email: '',
    phone: '',
  });

  return (
    <View style={styles.container}>
      {/* 아이디 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>아이디</Text>
        <TextInput
          onChangeText={id => setForm({...form, id})}
          value={form.id}
          style={styles.textInput}
          placeholder="아이디"
        />
        <Text style={styles.errorMsg}>
          {submit && form.id.length < 5 && '아이디는 5자 이상 입력해주세요'}
        </Text>
      </View>

      {/* 비밀번호 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>비밀번호</Text>
        <TextInput
          onChangeText={password => setForm({...form, password})}
          value={form.password}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="비밀번호"
        />
        <Text style={styles.errorMsg}>sdf</Text>
      </View>

      {/* 비밀번호 확인 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>비밀번호 확인</Text>
        <TextInput
          onChangeText={passwordCheck => setForm({...form, passwordCheck})}
          value={form.passwordCheck}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="비밀번호 확인"
        />
        <Text style={styles.errorMsg}>sdf</Text>
      </View>

      {/* 이메일 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>이메일</Text>
        <TextInput
          onChangeText={email => setForm({...form, email})}
          value={form.email}
          style={styles.textInput}
          placeholder="이메일"
        />
        <Text style={styles.errorMsg}>sdf</Text>
      </View>

      {/* 전화번호 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>전화번호</Text>
        <TextInput
          onChangeText={phone => setForm({...form, phone})}
          value={form.phone}
          style={styles.textInput}
          placeholder="전화번호"
        />
        <Text style={styles.errorMsg}>sdf</Text>
      </View>

      {/* 회원가입 버튼 */}
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.registBtn}
          onPress={() => {
            setSubmit(true);
          }}>
          <Text style={styles.registBtnText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 16,
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
  errorMsg: {
    color: 'red',
    paddingTop: 4,
    height: 20,
    marginLeft: 2,
  },
  registBtn: {
    backgroundColor: '#2E8CF4',
    alignItems: 'center',
    borderRadius: 5,
    padding: 16,
    marginTop: 12,
  },
  registBtnText: {
    fontFamily: 'NotoSansKR-VariableFont_wght',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Regist;
