import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NoFeedSvg from '../../assets/icons/noFeed.svg';
const NoFeed = ({text}) => {
  return (
    <View style={styles.feedArea}>
      <NoFeedSvg
        style={styles.noFeedIcon}
        color="#ddd"
        width={44}
        height={44}
      />
      <Text style={styles.noFeedText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  feedArea: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  noFeedIcon: {
    marginBottom: 8,
  },
  noFeedText: {
    fontFamily: 'GmarketSansTTFMedium',
    fontWeight: 'semibold',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default NoFeed;
