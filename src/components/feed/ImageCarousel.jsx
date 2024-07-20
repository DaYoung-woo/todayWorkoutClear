import React from 'react';
import {Dimensions, View, Text, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const screenWidth = Dimensions.get('window').width;

const ImageCarousel = ({images}) => {
  return (
    <Carousel
      loop={true}
      autoPlay={false}
      style={{width: screenWidth, height: screenWidth}}
      width={screenWidth}
      height={screenWidth}
      data={images}
      renderItem={({item}) => {
        return (
          <View>
            <Image
              source={{uri: `http://13.209.27.220:8080${item}`}}
              style={styles.thumbImage}
            />
            <Text>{item}</Text>
          </View>
        );
      }}
      scrollAnimationDuration={1200}
    />
  );
};

const styles = StyleSheet.create({
  thumbImage: {
    width: screenWidth,
    height: screenWidth,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
});
export default ImageCarousel;
