import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons'
//screens
import Home from '../screens/Home';
import Payment from '../screens/Payment';
import Status from '../screens/Status';
import Profile from '../screens/Profile';

//screeen names
const homeName = 'Home';
const paymentName = 'Payment';
const statusName = 'Status';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;
            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === paymentName) {
              iconName = focused ? 'payment' : 'payment-outline';
            } else if (rn === statusName) {
              iconName = focused ? 'status' : 'status-outline';
            } else if (rn === profileName) {
              iconName = focused ? 'profile' : 'profile-outline';
            }
            return <Text>{iconName}</Text>;
          },
        })}>
        <Tab.Screen name={homeName} component={Home} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
