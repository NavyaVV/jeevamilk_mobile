import React from "react";
import Home from "./Home";
import MilkDetails from "./MilkDetails";
import { createStackNavigator } from "@react-navigation/stack";
import PaymentDetails from "./PaymentDetails";
import Notifications from "./Notifications";

const Stack = createStackNavigator();
const HomeCover = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeOne"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Milkdetails"
        component={MilkDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notifications}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeCover;
