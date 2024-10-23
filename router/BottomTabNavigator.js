import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Status from '../screens/Status';
import Insurance from '../screens/Insurance';
import Payment from '../screens/Payment';
import messaging from '@react-native-firebase/messaging';
// import Settings from '../screens/Settings';
// import {
//   HomeActiveTapIcon,
//   HomeIcon,
//   PaymentActiveTabIcon,
//   PaymentTabIcon,
//   ProfileActiveIcon,
//   ProfileTabIcon,
//   StatusActiveTabIcon,
//   StatusTabIcon,
// } from '../assets/icons';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CowIcon} from '../assets/images';
import MilkDetails from '../screens/MilkDetails';
import HomeCover from '../screens/HomeCover';
import {registerDevice} from '../api/auth';
import {
  HomeActive,
  HomeIcon,
  PaymentActiveIcon,
  PaymentIcon,
  ProfileActiveIcon,
  StatusActive,
  StatusIcon,
  ProfileIcon,
  InsureActiveIcon,
  InsureIcon,
} from '../assets/svg-icons';

const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({focused, IconComponent}) => (
  <IconComponent
    width={focused ? 30 : 25}
    height={focused ? 30 : 25}
    style={{
      marginBottom: focused ? 5 : 0,
    }}
  />
);

const CenterTabButton = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      height: 70,
      backgroundColor: '#fff',
      borderRadius: 35,
      top: -35,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    }}>
    <CustomTabBarIcon focused={true} icon={CowIcon} />
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  const [fcmToken, setFCMToken] = useState('');

  useEffect(() => {
    async function getFCMToken() {
      try {
        const token = await messaging().getToken();
        setFCMToken(token);
        registerDevice(token).then(res => {
          console.log(res);
        });
      } catch (error) {
        console.log(error);
      }
    }

    getFCMToken();
  }, []);
  console.log(fcmToken, '______token');
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let IconComponent;

          if (route.name === 'Home') {
            IconComponent = focused ? HomeActive : HomeIcon;
          } else if (route.name === 'Status') {
            IconComponent = focused ? StatusActive : StatusIcon;
          } else if (route.name === 'Payments') {
            IconComponent = focused ? PaymentActiveIcon : PaymentIcon;
          } else if (route.name === 'Profile') {
            IconComponent = focused ? ProfileActiveIcon : ProfileIcon;
          } else if (route.name === 'Insurance') {
            IconComponent = focused ? InsureActiveIcon : InsureIcon;
          }

          return (
            <CustomTabBarIcon focused={focused} IconComponent={IconComponent} />
          );
        },
        tabBarLabel: ({focused}) => {
          // Customize label text, size, and color
          let labelText;

          switch (route.name) {
            case 'Home':
              labelText = 'Home';
              break;
            case 'Status':
              labelText = 'Status';
              break;
            case 'Payments':
              labelText = 'Payments';
              break;
            case 'Profile':
              labelText = 'Profile';
              break;
            case 'Insurance':
              labelText = 'Insurance';
              break;
            default:
              labelText = '';
          }

          return (
            <Text
              style={{
                fontSize: 14, 
                color: focused ? '#56C9DC' : '#878C90', 
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              {labelText}
            </Text>
          );
        },
        tabBarStyle: {
          height: 80,
          justifyContent: 'center',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingBottom: 15,
          paddingTop:10
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeCover}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Status"
        component={MilkDetails}
        // component={Status}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Insurance"
        component={Insurance}
        options={{headerShown: false}}
      />
      {/* Render the custom centered tab button */}
      {/* <Tab.Screen name="CenterTabButton" component={Insurance} options={{ tabBarButton: () => <CenterTabButton /> }} /> */}
      <Tab.Screen
        name="Payments"
        component={Payment}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen name="Settings" component={MilkDetails} options={{ tabBarVisible: false }} /> */}
      {/* <Tab.Screen name="Settings" component={MilkDetails} options={{ tabBarVisible:false,headerShown: false  }} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
