import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

const CommonModal = ({text, isShow, setIsShow}) => {
  return (
    <View style={styles.flex}>
      <Button title="Show modal" onPress={setIsShow} />

      <Modal isVisible={isShow}>
        <View style={styles.flex}>
          <Text>{text}</Text>

          <Button title="Hide modal" onPress={setIsShow} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default CommonModal;
