import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

const InputWithBtn = (label, value, setValue, onPress) => {
  return (
    <View style={styles.editArea}>
      <TextInput
        style={styles.textInput}
        placeholder={label}
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>작성</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'GmarketSansTTFMedium',
    borderWidth: 1,
    padding: 12,
    height: 44,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#aaa',
    marginVertical: 12,
    marginHorizontal: 8,
    flex: 1,
  },
  editArea: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingRight: 8,
  },
  btn: {
    fontFamily: 'GmarketSansTTFMedium',
    backgroundColor: '#2E8CF4',
    borderRadius: 5,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});
export default InputWithBtn;
