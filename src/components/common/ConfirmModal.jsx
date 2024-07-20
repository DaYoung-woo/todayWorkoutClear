import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

const ConfirmModal = ({
  question,
  isShow,
  yesMsg,
  noMsg,
  onPressYes,
  onPressNo,
}) => {
  return (
    <Modal isVisible={isShow} contentContainerStyle={styles.continer}>
      <View style={styles.continer}>
        <Text style={styles.question}>{question}</Text>

        <View style={styles.btnArea}>
          <TouchableOpacity onPress={onPressNo}>
            <Text style={styles.btnText}>{noMsg}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressYes}>
            <Text style={styles.btnText}>{yesMsg}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  continer: {
    textAlign: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    borderRadius: 5,
  },
  question: {
    fontFamily: 'GmarketSansTTFMedium',
    padding: 12,
    fontSize: 16,
    color: '#555',
  },
  btnArea: {
    flexDirection: 'row',
    gap: 36,
    marginTop: 24,
    marginBottom: 12,
  },
  btnText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#2e8cf4',
  },
});

export default ConfirmModal;
