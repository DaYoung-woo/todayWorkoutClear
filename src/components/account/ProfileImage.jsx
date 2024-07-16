import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const ProfileImage = () => {
  return (
    <View style={styles.profileWrapper}>
      <Image
        source={profile || require('../assets/images/basicUser.png')}
        style={styles.profile}
      />
      <CameraSvg width={44} height={44} color="#555" />
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    width: 120,
    height: 120,
  },
});

export default ProfileImage;
