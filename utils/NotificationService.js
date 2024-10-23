import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async() =>{
     let fcmToken = await AsyncStorage.getItem('fcmtoken')
     console.log(fcmToken,"this is fcm token");
     if (!fcmToken){
        try {
            const  fcmToken = await messaging().getToken();
            if (fcmToken){
                console.log(fcmToken,"fcmtoken new");
                await AsyncStorage.setItem('fcmtoken',fcmToken)
            } 
        } catch (error) {
            console.log(error,"eeror in fcm token");
        }
     }
}