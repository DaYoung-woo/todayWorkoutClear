import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {searchFeedApi} from '../../api';
import Toast from 'react-native-toast-message';
import FeedGallery from '../../components/common/FeedGallery';
import NoFeed from '../../components/common/NoFeed';

const Search = ({navigation}) => {
  const [search, setSeatch] = useState('');
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    loadAllFeed();
  }, []);

  const loadAllFeed = async () => {
    try {
      const res = await searchFeedApi({
        searchTag: 'all',
        page: 0,
        pageSize: 20,
      });
      setFeedList(res.data.result.content);
    } catch (e) {
      console.log(e);
    }
  };

  const submitForm = async () => {
    if (!search) {
      Toast.show({type: 'error', text1: '검색어를 입력해주세요.'});
      return;
    }
    try {
      const res = await searchFeedApi({
        searchTag: search,
        page: 0,
        pageSize: 20,
      });
      setFeedList(res.data.result.content);
    } catch (e) {
      console.log(e);
    }
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
        {!!feedList.length && (
          <ScrollView>
            <FeedGallery feedList={feedList} />
          </ScrollView>
        )}
        {!feedList.length && (
          <View style={styles.noFeedArea}>
            <NoFeed text="검색 결과가 없습니다." />
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
    fontFamily: 'GmarketSansTTFMedium',
    color: '#fff',
    fontSize: 16,
  },
  noFeedArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Search;
