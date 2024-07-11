import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {registApi} from '../api/index';

const Regist = () => {
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    password: '',
    passwordCheck: '',
    email: '',
    phoneNumber: '',
    nickname: '',
  });

  // 이메일 유효성 검사
  const getEmailValid = () => {
    if (!form.email) {
      return '이메일을 입력해주세요';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(form.email)) {
      return '이메일 형식에 맞게 입력해주세요.';
    }

    return '';
  };

  // 패스워드 유효성 검사
  const getPasswordValid = () => {
    /* 회원가입 시 비밀번호는 8~20, 최소 하나의 영어소문자, 영어 대문자, 특수 문자, 숫자 이상 포함되어야 합니다 */
    if (!form.password) {
      return '비밀번호를 입력해주세요.';
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!regex.test(form.password)) {
      return '대/소문자, 특수 문자, 숫자를 포함하여 8글자 이상 입력하세요.';
    }

    if (form.password.length > 20) {
      return '비밀번호는 20자 이하로만 입력해주세요';
    }

    return '';
  };

  // 패스워드 확인 유효성 검사
  const getPasswordCheckValid = () => {
    if (!form.passwordCheck) {
      return '비밀번호 확인을 입력해주세요.';
    }

    if (form.password !== form.passwordCheck) {
      return '비밀번호와 일치하지 않습니다.';
    }

    return '';
  };

  const sumbitForm = () => {
    if (getEmailValid().length > 0) {
      return;
    }
    if (getPasswordValid().length > 0) {
      return;
    }
    if (getPasswordCheckValid().length > 0) {
      return;
    }
    if (!form.email.length && form.number === 0) {
      return;
    }
    registUser();
  };

  const registUser = async () => {
    try {
      const param = {...form};
      delete param.passwordCheck;

      const res = await registApi(param);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      {/* 이메일 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>이메일</Text>
        <TextInput
          onChangeText={email => setForm({...form, email})}
          value={form.email}
          style={styles.textInput}
          placeholder="이메일"
        />
        <Text style={styles.errorMsg}>{submit && getEmailValid()}</Text>
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
        <Text style={styles.errorMsg}>{submit && getPasswordValid()}</Text>
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

        <Text style={styles.errorMsg}>
          {' '}
          {submit && getPasswordCheckValid()}
        </Text>
      </View>

      {/* 닉네임 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>이메일</Text>
        <TextInput
          onChangeText={nickname => setForm({...form, nickname})}
          value={form.nickname}
          style={styles.textInput}
          placeholder="닉네임"
        />
        <Text style={styles.errorMsg}>
          {submit &&
            form.nickname.length < 2 &&
            '2글자 이상의 닉네임을 입력해주세요.'}
        </Text>
      </View>

      {/* 전화번호 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>전화번호</Text>
        <TextInput
          onChangeText={phoneNumber => {
            if (/^\d+$/.test(phoneNumber)) {
              setForm({...form, phoneNumber});
            }
          }}
          value={form.phoneNumber}
          style={styles.textInput}
          placeholder="전화번호"
          keyboardType="number-pad"
        />
        <Text style={styles.errorMsg}>
          {submit && !form.phoneNumber.length && '전화번호를 입력해주세요.'}
        </Text>
      </View>

      {/* 회원가입 버튼 */}
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.registBtn}
          onPress={() => {
            setSubmit(true);
            sumbitForm();
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
    paddingBottom: 12,
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
    marginTop: 20,
  },
  registBtnText: {
    fontFamily: 'NotoSansKR-VariableFont_wght',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Regist;
