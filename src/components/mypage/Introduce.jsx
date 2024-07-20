import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Introduce = ({nickName, introduce}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.introduceContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
        <Text style={styles.nickName}>{nickName}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
        {introduce ? (
          <Text style={styles.introduceText}>{introduce}</Text>
        ) : (
          <Text style={styles.noIntroduceText}>
            아직 소개글이 없네요. 자신을 표현해보세요!
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nickName: {
    paddingVertical: 8,
    fontFamily: 'GmarketSansTTFMedium',
  },
  introduceContainer: {
    marginVertical: 16,
    borderRadius: 5,
    paddingHorizontal: 16,
  },
  noIntroduceText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#999',
  },
  introduceText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#555',
  },
});
export default Introduce;
