import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {BackIcon} from '../assets/icons';
import { useNavigation } from '@react-navigation/native';

const SingleHeader = ({title}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={BackIcon} />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={{width: 10}} />
    </View>
  );
};

export default SingleHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
