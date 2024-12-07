import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import { AuthContext } from "../context/AuthContext";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

const Main = () => {

  const { isAuth } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {isAuth ? (
        <Stack.Screen
          name="Private"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default Main;
