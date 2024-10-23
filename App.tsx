import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Main from './router/Main.js';
import Store from './context/Store';
import SplashScreen from './Components/SplashScreen';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  const [splashScreen, setSplashScreen] = useState(true);

  useEffect(() => {
    console.log('Splash screen initial state:', splashScreen);
    setTimeout(() => {
      console.log('Hiding splash screen...');
      setSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <>
      {splashScreen ? (
        <SplashScreen />
      ) : (
        <GestureHandlerRootView style={styles.container}>
          <Store>
            <View style={{flex: 1}}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName={'Main'}>
                  <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{headerShown: false}}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </Store>
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
    // paddingTop: 50,
  },
  container2: {
    flex: 1,
    backgroundColor: '#F3F8F9',
  },
});
