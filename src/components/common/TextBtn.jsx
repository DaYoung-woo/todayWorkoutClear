import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TextBtn = ({label, onPress}) => {
  return (
    <View style={styles.registBtn}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.registBtnText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TextBtn;
