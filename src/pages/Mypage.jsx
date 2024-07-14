import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const Mypage = () => {
  const [submit, setSubmit] = useState('');
  const [nickname, setNickname] = useState('');
  return (
    <View style={styles.container}>
      {/* 닉네임 */}
      <View style={styles.wrapper}>
        <Text style={styles.textInputLabel}>이메일</Text>
        <TextInput style={styles.textInput} placeholder="닉네임" />
        <Text style={styles.errorMsg}>
          {submit &&
            nickname.length < 2 &&
            '2글자 이상의 닉네임을 입력해주세요.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Mypage;
