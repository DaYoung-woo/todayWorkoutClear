import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const Logo = ({fonsSize, height, width, marginTop}) => {
  const styles = StyleSheet.create({
    logoArea: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logoIcon: {
      height: height,
      width: width,
      marginTop: marginTop || -14,
    },
    logoText: {
      fontFamily: 'JalnanGothicTTF',
      fontSize: fonsSize,
      color: '#2E8CF4',
    },
  });

  return (
    <View style={styles.logoArea}>
      <Image
        source={require('../../assets/icons/arm.png')}
        style={styles.logoIcon}
        resizeMode="contain"
      />
      <Text style={styles.logoText}>오운완</Text>
    </View>
  );
};

export default Logo;
