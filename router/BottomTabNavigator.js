import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeCover from "../screens/HomeCover";
import MilkDetails from "../screens/MilkDetails";
import Insurance from "../screens/Insurance";
import Payment from "../screens/Payment";
import Profile from "../screens/Profile";

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
} from "../assets/svg-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
      backgroundColor: "#FFFFFF",
      width: 80,
      height: 80,
      borderRadius: 40,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#56C9DC",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#FCFDFF",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeCover}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {focused ? <HomeActive /> : <HomeIcon />}
              <Text
                style={{
                  color: focused ? "#56C9DC" : "#878C90",
                  fontSize: 12,
                  fontWeight: focused ? 500 : 400,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Status"
        component={MilkDetails}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {focused ? <StatusActive /> : <StatusIcon />}
              <Text
                style={{
                  color: focused ? "#56C9DC" : "#878C90",
                  fontSize: 12,
                  fontWeight: focused ? 500 : 400,
                }}
              >
                Status
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Insurance"
        component={Insurance}
        options={{
          tabBarIcon: () => <InsureIcon />,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Payments"
        component={Payment}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {focused ? <PaymentActiveIcon /> : <PaymentIcon />}
              <Text
                style={{
                  color: focused ? "#56C9DC" : "#878C90",
                  fontSize: 12,
                  fontWeight: focused ? 500 : 400,
                }}
              >
                Payments
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {focused ? <ProfileActiveIcon /> : <ProfileIcon />}
              <Text
                style={{
                  color: focused ? "#56C9DC" : "#878C90",
                  fontSize: 12,
                  fontWeight: focused ? 500 : 400,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
});
