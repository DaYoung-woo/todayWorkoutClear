import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
const PrimaryBtn = () => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.registBtn} onPress={sumbitForm}>
        <Text style={styles.registBtnText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryBtn;
