import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import MilkDetails from './MilkDetails';
import {createStackNavigator} from '@react-navigation/stack';
import PaymentDetails from './PaymentDetails';
import Notifications from './Notifications';

const Stack = createStackNavigator();
const HomeCover = () => {
  const navigationRef = useRef(null);

  return (
    // <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="HomeOne"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Milkdetails"
        component={MilkDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notifications}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    //   </NavigationContainer>
  );
};

export default HomeCover;
