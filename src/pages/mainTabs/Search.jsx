import React, {useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import NoFeedSvg from '../../assets/icons/noFeed.svg';
import {searchFeedApi} from '../../api';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / numColumns;

const Search = ({navigation}) => {
  const [search, setSeatch] = useState('');
  const [feedList, setFeedList] = useState([]);

  const submitForm = async () => {
    if (!search) {
      Toast.show({
        type: 'error',
        text1: '검색어를 입력해주세요.',
      });
      return;
    }
    try {
      const res = await searchFeedApi({
        searchTag: search,
        page: 0,
        pageSize: 20,
      });
      console.log(res.data.result.content);
      setFeedList(res.data.result.content);
    } catch (e) {
      console.log(e);
    }
  };
  // 피드 정렬을 위한 row 세팅
  const renderRow = (rowData, rowIndex) => {
    return (
      <View key={rowIndex} style={styles.row}>
        {rowData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => navigation.navigate('Feed', {id: item.id})}>
            <Image
              source={{uri: `http://13.209.27.220:8080${item.images[0]}`}}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // 피드 정렬을 위한 column 세팅
  const groupPhotosInRows = (photos, numColumns) => {
    const rows = [];
    for (let i = 0; i < photos.length; i += numColumns) {
      rows.push(photos.slice(i, i + numColumns));
    }
    return rows;
  };

  //피드 리스트가 존재하는 경우
  const FeeListExist = ({feedList}) => {
    const rows = groupPhotosInRows(feedList, numColumns);
    return (
      <View style={styles.feedListContainer}>
        {rows.map((item, idx) => {
          return renderRow(item, idx);
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.textInput}
          placeholder="검색"
          value={search}
          onChangeText={setSeatch}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={submitForm}>
          <Text style={styles.searchBtnText}>검색</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        {!!feedList.length && <FeeListExist feedList={feedList} />}
        {!feedList.length && (
          <View style={styles.noFeedArea}>
            <NoFeedSvg
              style={styles.noFeedIcon}
              color="#ddd"
              width={42}
              height={48}
            />
            <Text style={styles.noFeenMsg}>검색 결과가 없습니다.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchArea: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingRight: 8,
  },
  textInput: {
    fontFamily: 'GmarketSansTTFMedium',
    borderWidth: 1,
    padding: 12,
    height: 44,
    borderRadius: 5,
    fontSize: 16,
    borderColor: '#aaa',
    marginVertical: 12,
    marginHorizontal: 8,
    flex: 1,
  },
  searchBtn: {
    fontFamily: 'GmarketSansTTFMedium',
    backgroundColor: '#2E8CF4',
    borderRadius: 5,
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchBtnText: {
    color: '#fff',
    fontSize: 16,
  },
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
    flex: 1,
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  feedListEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFeenMsg: {
    fontFamily: 'GmarketSansTTFMedium',
    fontWeight: 'semibold',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  noFeedArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Search;
