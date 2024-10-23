import React, {useEffect, useRef, useState} from 'react';
import {
  NavigationContainer,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import Notifications from '../screens/Notifications';

const Stack = createStackNavigator();

const Main = () => {
  const navigationRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        if (jsonValue) {
          const userData = JSON.parse(jsonValue);
          setUserData(userData.access);
          if (userData) {
            navigation.navigate('Private');
          } else {
            navigation.navigate('Auth');
          }
        }
      } catch (e) {
        // Handle the error appropriately
      }
    };

    fetchData();
  });

  return (
    <Stack.Navigator initialRouteName={userData ? 'Private' : 'Auth'}>
      <Stack.Screen
        name="Auth"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Private"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Main;
