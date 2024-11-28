import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Main from './router/Main.js';
import Store from './context/Store';
import SplashScreen from './Components/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import { AuthProvider } from './context/AuthContext.js';
  

const Stack = createStackNavigator();

function App() {
  const [splashScreen, setSplashScreen] = useState(true);


  // Firebase push notification settings //////////

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  //triggers a native permission dialog requesting the user's permission
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }

  //device token
  const getToken = async () => {
    const token = await messaging().getToken();
    // console.log("Token = " , token);
  }

  //For Foreground notification
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new message arrived!', `${remoteMessage.notification?.title}\n${remoteMessage.notification?.body}` );
    });
  
    return unsubscribe;
  }, []);

  // For Background Notifications
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  
  useEffect(() => {
    requestUserPermission()
    getToken()
  }, []);
  //////////////////////////////////////


  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <>
      {splashScreen ? (
        <SplashScreen />
      ) : (
        <GestureHandlerRootView style={styles.container}>
          <AuthProvider>
            <Store>
              <View style={{flex: 1}}>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Main"
                      component={Main}
                      options={{headerShown: false}}
                      />
                  </Stack.Navigator>
                </NavigationContainer>
              </View>
            </Store>
          </AuthProvider>
        </GestureHandlerRootView>
      )}
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F8F9',
  },
  container2: {
    flex: 1,
    backgroundColor: '#F3F8F9',
  },
});
