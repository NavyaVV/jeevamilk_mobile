import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Main from './router/Main.js';
import Store from './context/Store';
import SplashScreen from './Components/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext.js';
import { initializeNotifications } from './services/NotificationService.js';
  

const Stack = createStackNavigator();

function App() {
  const [splashScreen, setSplashScreen] = useState(true);

  useEffect(() => {
    initializeNotifications();
  }, []);

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
