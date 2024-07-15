import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Search</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default Search;
