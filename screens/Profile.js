// import * as React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LocationIcon, PhoneIcon, ProfileIcon} from '../assets/images';
import {COLORS, globalStyles} from '../Components/constants/constants';
import {useEffect, useState} from 'react';
import {profileDetail} from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

export default function Profile({navigation}) {
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    profileDetail().then(res => {
      console.log(res);
      console.log(res.data.app_data.data, '4040404004--------');
      setProfileData(res.data.app_data.data);
    });
  }, []);
  const handleLogout = () => {
    AsyncStorage.clear()
      .then(() => {
        console.log('Storage successfully cleared!');

        navigation.navigate('Auth');
      })
      .catch(error => {
        console.error('Error clearing storage:', error);
      });
  };
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#F3F8F9',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#49BFD4',
              width: 90,
              height: 90,
              borderRadius: 45,
              padding: 7,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: '100%',
                height: '100%',
                borderRadius: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={ProfileIcon} />
            </View>
          </View>
          <View style={{paddingVertical: 16}}>
            <Text style={{textAlign: 'center', fontSize: 26, color: '#000'}}>
              {profileData.name}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 18, color: '#49BFD4'}}>
              ID : {profileData.farmer_id}
            </Text>
          </View>
        </View>
        <View style={globalStyles.card}>
          <View>
            <Image source={PhoneIcon} />
          </View>
          <View>
            <Text style={{color: '#747474', fontSize: 16}}>Phone number</Text>
            <Text style={{fontSize: 18, color: '#000'}}>
              +91 {profileData.phone}
            </Text>
          </View>
        </View>
        <View style={globalStyles.card}>
          <View>
            <Image source={LocationIcon} />
          </View>
          <View>
            <Text style={{color: '#747474', fontSize: 16}}>Address</Text>
            <Text style={{fontSize: 18, color: '#000'}}>
              {profileData.address}
            </Text>
          </View>
        </View>
        <View style={globalStyles.card}>
          <View>
            <Image source={PhoneIcon} />
          </View>
          <View>
            <Text style={{color: '#747474', fontSize: 16}}>Society</Text>
            <Text style={{fontSize: 18, color: '#000'}}>
              {profileData.society}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            paddingVertical: 15,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'red',
            borderRadius: 5,
          }}>
          <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
