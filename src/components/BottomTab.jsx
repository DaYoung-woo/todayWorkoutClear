import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import HomeSvg from '../assets/icons/home.svg';
import SearchSvg from '../assets/icons/search.svg';
import PlusSvg from '../assets/icons/plus.svg';
import PlaySvg from '../assets/icons/play.svg';
import AccountSvg from '../assets/icons/account.svg';

const BottomTab = ({navigation, state}) => {
  // 탭 클릭 이벤트
  const moveTab = name => {
    navigation.navigate(name);
  };
  useEffect(() => {
    console.log(state.index);
    console.log(state.routes[state.index - 1]);
  }, [state]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => moveTab('Home')}>
        <HomeSvg
          width={36}
          height={36}
          color={state.index === 0 ? '#555' : '#ddd'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Search')}>
        <SearchSvg
          width={36}
          height={36}
          color={state.index === 1 ? '#555' : '#ddd'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Plus')}>
        <PlusSvg
          width={36}
          height={36}
          color={state.index === 2 ? '#555' : '#ddd'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Play')}>
        <PlaySvg
          width={36}
          height={36}
          color={state.index === 3 ? '#555' : '#ddd'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => moveTab('Account')}>
        <AccountSvg
          width={36}
          height={36}
          color={state.index === 4 ? '#555' : '#ddd'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
  },
});

export default BottomTab;
