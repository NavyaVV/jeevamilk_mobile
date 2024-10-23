import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TimeIcon} from '../assets/icons';

const NotificationCard = ({item}) => {
  console.log(item);
  return (
    <View style={styles.container}>
      <View style={styles.topCover}>
        <Text style={styles.heading}>{item.heading}</Text>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Text style={styles.timeTest}>{item.created_time}</Text>
          <Image source={TimeIcon} />
        </View>
      </View>
      <View style={{marginTop:10}}>
        <Text style={{color: '#898989'}}>{item.message}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  heading: {
    fontSize: 20,
    color: '#4A4D4E',
    fontWeight: 'bold',
  },
  topCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTest: {
    color: '#747474',
  },
});
