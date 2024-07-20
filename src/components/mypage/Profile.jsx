import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import CameraSvg from '../../assets/icons/camera.svg';
import {updateProfleImageApi} from '../../api';
import ImagePicker from 'react-native-image-crop-picker';

const Profile = ({profile, setProfile}) => {
  // 이미지 선택
  const selectImage = async () => {
    try {
      const file = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: false,
      });

      updateProfile(file);
    } catch (e) {
      console.log(e);
    }
  };

  // 이미지 변경
  const updateProfile = async file => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: file.path,
        type: file.mime,
        name: `image_${file.path.substring(file.path.indexOf('picker/') + 7)}`,
      });

      const res = await updateProfleImageApi(formData);
      setProfile(res.data.result.profileImagePath);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity style={styles.profileWrapper} onPress={selectImage}>
        <Image
          source={
            profile
              ? {uri: `http://13.209.27.220:8080${profile}`}
              : require('../../assets/images/basicUser.png')
          }
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
    borderRadius: 100,
  },
});

export default Profile;
