import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Profile = ({feed, following, follower, profileImagePath}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.profile}>
      <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
        <View style={styles.textAlign}>
          <Image
            source={
              profileImagePath
                ? {uri: `http://13.209.27.220:8080${profileImagePath}`}
                : require('../assets/images/basicUser.png')
            }
            style={styles.profileImage}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.accountInfoContainer}>
        <View style={styles.accountInfoItem}>
          <Text style={styles.accountInfoItemCount}>{feed}</Text>
          <Text style={styles.accountInfoItemLabel}>피드</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Follow', {isFollwing: true})}>
          <Text style={styles.accountInfoItemCount}>{following}</Text>
          <Text style={styles.accountInfoItemLabel}>팔로잉</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Follow', {isFollwing: false})}>
          <Text style={styles.accountInfoItemCount}>{follower}</Text>
          <Text style={styles.accountInfoItemLabel}>팔로워</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {flexDirection: 'row', paddingHorizontal: 16, marginTop: 16},
  profileImage: {
    width: 88,
    height: 88,
    borderRadius: 100,
  },
  accountInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  accountInfoItemLabel: {
    fontFamily: 'GmarketSansTTFMedium',
    textAlign: 'center',
    marginTop: 8,
    color: '#999',
  },
  accountInfoItemCount: {
    fontFamily: 'GmarketSansTTFMedium',
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  textAlign: {
    textAlign: 'center',
  },
});
export default Profile;
