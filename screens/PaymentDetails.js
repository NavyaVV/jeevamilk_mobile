import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../api';
import Header from './Header';
import {BackIcon, TimeIcon} from '../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {BankIcon, CalenderIcon, PaymentReceivedIcon} from '../assets/images';
import {COLORS} from '../Components/constants/constants';

const PaymentDetails = ({route}) => {
  const {id} = route.params.data;
  const [details, setDetails] = useState({});
  console.log(id);
  useEffect(() => {
    api.get(`payments/single-farmer-payment-history/${id}/`).then(res => {
      setDetails(res.data.app_data.data);
    });
  }, [id]);
  const navigation = useNavigation();
  console.log(details, 'details');
  const TopHeader = () => (
    <View
      style={{
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={BackIcon} />
      </TouchableOpacity>
      <View>
        <Text style={{color: '#181818', fontSize: 24, fontWeight: 'bold'}}>
          Payment Details
        </Text>
      </View>
      <View style={{width: 10}} />
    </View>
  );
  return (
    <View style={{flex: 1, backgroundColor: '#F3F8F9'}}>
      <Header />
      <View>
        <TopHeader />
        <View style={{paddingHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 20, color: '#4A4D4E', fontWeight: 'bold'}}>
              Milk amount
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={{color: '#747474'}}>{details?.created_at}</Text>
              <Image source={TimeIcon} />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{color: '#747474'}}>{details?.detail}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.cover}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
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
                  <Text style={{color: '#747474', fontSize: 16}}>
                    Milk Amount
                  </Text>
                  <Text style={{fontSize: 24, color: '#4A4D4E'}}>
                    ₹{details.amount}
                  </Text>
                </View>
              </View>
              <View style={{alignItems: 'flex-end', gap: 5}}>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Text style={{color: '#747474', fontSize: 16}}>
                    {details.created_at}
                  </Text>
                  <Image source={CalenderIcon} />
                </View>
                <View
                  style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                  <Text style={{color: '#747474', fontSize: 16}}>Credited</Text>
                  <Image source={BankIcon} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentDetails;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    // flexDirection: 'row',
  },
  cover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
