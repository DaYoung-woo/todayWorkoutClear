import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import NoFeed from '../components/common/NoFeed';

const Follow = ({navigation}) => {
  const noFollow =
    '아직 팔로우하는 사람이 없네요. \n관심 있는 사람을 찾아 팔로우해보세요!';
  return (
    <View style={styles.container}>
      <NoFeed text={noFollow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Follow;
