import React, { createContext, useEffect, useState } from "react";
import { setLogoutCallback } from "../services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true); // To handle app loading state

  const login = async () => {
    try {
      await AsyncStorage.setItem("isAuth", "true"); // Save to AsyncStorage
      setIsAuth(true);
    } catch (error) {
      console.error("Failed to save auth state:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("isAuth"); // Remove from AsyncStorage
      setIsAuth(false);
    } catch (error) {
      console.error("Failed to remove auth state:", error);
    }
  };

   // Restore auth state on app start
   useEffect(() => {
    const restoreAuthState = async () => {
      try {
        const storedAuth = await AsyncStorage.getItem("isAuth");
        if (storedAuth === "true") {
          setIsAuth(true);
        }
      } catch (error) {
        console.error("Failed to load auth state:", error);
      } finally {
        setLoading(false); // Set loading to false after restoring state
      }
    };

    restoreAuthState();
    setLogoutCallback(logout);
  }, []);

  if (loading) {
    return ;
  }

  //used this to make logout function accessible
  //in the axios interceptor without using hooks
  // useEffect(() => {
  //   setLogoutCallback(logout);
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
