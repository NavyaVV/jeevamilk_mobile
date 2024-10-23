import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, globalStyles} from './constants/constants';
import {
  BankIcon,
  CalenderIcon,
  DownloadIcon,
  PaymentReceivedIcon,
} from '../assets/images';
import {useNavigation} from '@react-navigation/native';

const PaymentCard = ({item}) => {
  console.log(item);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PaymentDetails', {data: item})}>
      {/* <Text style={{fontSize:26,color:'green'}}>Coming Soon...</Text> */}
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 7}}>
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: COLORS.icon_bg_color,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}>
          <Image source={PaymentReceivedIcon} />
        </View>
        <View>
          <Text style={{color: COLORS.text_muted_color}}>Amount</Text>
          <Text style={{color: COLORS.text_color, fontSize: 20}}>
            ₹{item?.amount}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end', gap: 10}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text style={{color: '#000'}}>{item?.created_at}</Text>
          <Image source={CalenderIcon} />
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text style={{color: '#000'}}>Bank</Text>
          <Image source={BankIcon} />
        </View>
        {/* <TouchableOpacity style={styles.downloadButton}>
          <Image source={DownloadIcon} />
          <Text style={{color: '#fff'}}>Download</Text>
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3F5FF',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  downloadButton: {
    width: 120,
    height: 35,
    backgroundColor: COLORS.button_bg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 5,
  },
});
