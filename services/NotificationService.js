// services/NotificationService.ts
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

export const foregroundNotificationHandler = () => {
  return messaging().onMessage(async remoteMessage => {
    Alert.alert(
      'A new message arrived!',
      `${remoteMessage.notification?.title}\n${remoteMessage.notification?.body}`
    );
  });
};

export const backgroundNotificationHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};

// Initialize notification settings
export const initializeNotifications = async () => {
  await requestUserPermission();
  await getToken();
  foregroundNotificationHandler();
  backgroundNotificationHandler();
};
