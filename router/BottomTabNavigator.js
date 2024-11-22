import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Insurance from "../screens/Insurance";
import Payment from "../screens/Payment";
import messaging from "@react-native-firebase/messaging";
import { Text, TouchableOpacity } from "react-native";
import { CowIcon } from "../assets/images";
import MilkDetails from "../screens/MilkDetails";
import HomeCover from "../screens/HomeCover";
import { registerDevice } from "../api/auth";
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

const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ focused, IconComponent }) => (
  <IconComponent
    width={focused ? 30 : 25}
    height={focused ? 30 : 25}
    style={{
      marginBottom: focused ? 5 : 0,
    }}
  />
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let IconComponent;

          if (route.name === "Home") {
            IconComponent = focused ? HomeActive : HomeIcon;
          } else if (route.name === "Status") {
            IconComponent = focused ? StatusActive : StatusIcon;
          } else if (route.name === "Payments") {
            IconComponent = focused ? PaymentActiveIcon : PaymentIcon;
          } else if (route.name === "Profile") {
            IconComponent = focused ? ProfileActiveIcon : ProfileIcon;
          } else if (route.name === "Insurance") {
            IconComponent = focused ? InsureActiveIcon : InsureIcon;
          }

          return (
            <CustomTabBarIcon focused={focused} IconComponent={IconComponent} />
          );
        },
        tabBarLabel: ({ focused }) => {
          // Customize label text, size, and color
          let labelText;

          switch (route.name) {
            case "Home":
              labelText = "Home";
              break;
            case "Status":
              labelText = "Status";
              break;
            case "Payments":
              labelText = "Payments";
              break;
            case "Profile":
              labelText = "Profile";
              break;
            case "Insurance":
              labelText = "Insurance";
              break;
            default:
              labelText = "";
          }

          return (
            <Text
              style={{
                fontSize: 14,
                color: focused ? "#56C9DC" : "#878C90",
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              {labelText}
            </Text>
          );
        },
        tabBarStyle: {
          height: 80,
          justifyContent: "center",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingBottom: 15,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeCover}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Status"
        component={MilkDetails}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Insurance"
        component={Insurance}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Payments"
        component={Payment}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
