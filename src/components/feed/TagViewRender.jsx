import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TagViewRender = ({content}) => {
  const splitText = content.split(/(#[\w가-힣]+)/g).filter(el => !!el);

  return (
    <Text style={styles.contentContainer}>
      {splitText.map(el =>
        el.split('').includes('#') ? (
          <Text style={styles.hashtagText} key={el}>
            {el}
          </Text>
        ) : (
          <Text style={styles.contentsText} key={el}>
            {el}
          </Text>
        ),
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
    flexDirection: 'row',
  },
  hashtagText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#2E8CF4',
  },
  contentsText: {
    fontFamily: 'GmarketSansTTFMedium',
    color: '#555',
  },
});

export default TagViewRender;
