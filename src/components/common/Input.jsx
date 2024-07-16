import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input = ({value, setValue, submit, valid, label, secureTextEntry}) => {
  return (
    <View>
      <Text style={styles.textInputLabel}>{label}</Text>
      <TextInput
        onChangeText={setValue}
        value={value}
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
        placeholder={label}
      />
      <Text style={styles.errorMsg}>{submit && valid}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputLabel: {
    fontFamily: 'GmarketSansTTFMedium',
    paddingBottom: 12,
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
  },
  textInput: {
    fontFamily: 'GmarketSansTTFMedium',
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
});

export default Input;
