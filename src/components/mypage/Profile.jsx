import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import CameraSvg from '../../assets/icons/camera.svg';

const Profile = ({profile}) => {
  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity style={styles.profileWrapper}>
        <Image
          source={profile || require('../../assets/images/basicUser.png')}
          style={styles.profile}
        />
        <View style={styles.cameraIcon}>
          <CameraSvg width={28} height={28} color="#555" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  profileWrapper: {},
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ddd',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  profile: {
    width: 120,
    height: 120,
  },
});

export default Profile;
