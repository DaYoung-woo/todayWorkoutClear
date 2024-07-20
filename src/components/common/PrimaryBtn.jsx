import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
const PrimaryBtn = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.primaryBtn} onPress={onPress}>
      <Text style={styles.primaryBtnText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryBtn: {
    backgroundColor: '#2E8CF4',
    alignItems: 'center',
    borderRadius: 5,
    padding: 16,
    marginTop: 20,
  },
  primaryBtnText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default PrimaryBtn;
