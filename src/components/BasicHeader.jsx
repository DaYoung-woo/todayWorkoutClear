import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const arrowLeft = require('../assets/icons/arrowLeft.png');

const BasicHeader = ({navigation, title, back}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leftArea}>
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowLeft} style={styles.backIcon} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightArea} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 16,
    fontFamily: 'NotoSansKR-VariableFont_wght',
    color: '#555',
  },
  leftArea: {
    width: 28,
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  rightArea: {
    width: 28,
  },
});
export default BasicHeader;
