// import React from 'react';
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {NavigationContainer} from '@react-navigation/native';
import {BankIcon, CowIcon} from '../assets/images';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import {HomeIcon} from '../assets';
import {
  HomeActiveTapIcon,
  PaymentActiveTabIcon,
  PaymentTabIcon,
  ProfileActiveIcon,
  ProfileTabIcon,
  StatusActiveTabIcon,
  StatusTabIcon,
} from '../assets/icons';
import Status from '../screens/Status';
import Payment from '../screens/Payment';
import Insurance from '../screens/Insurance';
import Header from '../screens/Header';

export default function BottomCurved() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = routeName == selectedTab ? HomeActiveTapIcon : HomeIcon;
        break;
      case 'Profile':
        icon = routeName == selectedTab ? ProfileActiveIcon : ProfileTabIcon;
        break;
      case 'Status':
        icon = routeName == selectedTab ? StatusActiveTabIcon : StatusTabIcon;
        break;
      case 'Payments':
        icon = routeName == selectedTab ? PaymentActiveTabIcon : PaymentTabIcon;
        break;
    }

    return <Image source={icon} />;
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
        <Text style={{color: routeName == selectedTab ? '#56C8DB' : '#747474'}}>
          {routeName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex:1}}>
      <Header />
      <CurvedBottomBar.Navigator
       options={{headerShown: false}}
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={80}
        // circleWidth={60}
        circlePosition="190px"
        bgColor="white"
        initialRouteName="Home"
        borderTopLeftRight
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Insurance')}>
              <Image source={CowIcon} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name="Home"
          position="LEFT"
          component={() => <Home />}
        />
        <CurvedBottomBar.Screen
          name="Status"
          position="LEFT"
          component={() => <Status />}
          headerShown={false}
        />
        <CurvedBottomBar.Screen
            name="Insurance"
            position="Right"
            component={() => <Insurance />}

        />
        <CurvedBottomBar.Screen
          name="Payments"
          component={() => <Payment />}
          position="RIGHT"
          options={{headerShown: false}} // Hide the header for this screen
        />
        <CurvedBottomBar.Screen
          name="Profile"
          component={() => <Profile />}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    bottom: 30,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#56C8DB',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
