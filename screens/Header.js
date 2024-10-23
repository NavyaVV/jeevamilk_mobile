import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Logo from '../assets/logo/logo.png';
// import NotificationIcon from '../assets/icons/Notifications.png';
import {useNavigation} from '@react-navigation/native';
import {NotificationIcon} from '../assets/svg-icons';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image source={Logo} />
        <Text style={styles.logo}>Jeeva Milk</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <NotificationIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F8F9',
  },
  logo: {
    color: '#1FA7BE',
    fontSize: 24,
  },
  left: {
    flexDirection: 'row',
    gap: 5,
  },
});
