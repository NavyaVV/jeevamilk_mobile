import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TimeIcon} from '../assets/icons';

const NotificationCard = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topCover}>
        <Text style={styles.heading}>{item.heading}</Text>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Text style={styles.timeTest}>{item.created_time}</Text>
          <Image source={TimeIcon} />
        </View>
      </View>
      <View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    gap: 10,
  },
  heading: {
    fontSize: 20,
    color: '#4A4D4E',
    fontWeight: '500',
  },
  topCover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeTest: {
    color: '#747474',
    fontSize: 13,
    fontWeight: '400',
  },
  message: {
    color: '#898989',
    fontSize: 14,
    fontWeight: '400',
  }
});
