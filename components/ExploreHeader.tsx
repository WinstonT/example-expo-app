import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.light.background,
  },
  container: {
    flexDirection: 'row',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 12,
    margin: 10,
    paddingHorizontal: 8,
    alignItems: 'center',

  },
  inputBar: {
    flex: 1,
    height: 40,
    padding: 8,
  },
});

export default function ExploreHeader() {

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Feather name='search' color={Colors.grey} size={12} />
        <TextInput style={styles.inputBar} placeholder='Search' placeholderTextColor={Colors.grey} />
      </View>
    </SafeAreaView>
  );
}