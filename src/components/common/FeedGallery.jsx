import React from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns;

// 피드 정렬을 위한 row 세팅
const renderRow = (rowData, rowIndex, navigation) => (
  <View key={rowIndex} style={styles.row}>
    {rowData.map(item => (
      <View key={item.id} style={styles.item}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Feed', {id: item.id})}>
          <Image
            source={{uri: `http://13.209.27.220:8080${item.images[0]}`}}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const FeedGallery = ({feedList}) => {
  console.log(feedList);
  const navigation = useNavigation();
  // 피드 정렬을 위한 column 세팅
  const groupPhotosInRows = photos => {
    const rows = [];
    for (let i = 0; i < photos.length; i += numColumns) {
      rows.push(photos.slice(i, i + numColumns));
    }
    return rows;
  };

  const rows = groupPhotosInRows(feedList);

  return (
    <View style={styles.feedListContainer}>
      {rows.map((item, idx) => {
        return renderRow(item, idx, navigation);
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  feedListContainer: {
    marginTop: 16,
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
});

export default FeedGallery;
