import React, { createContext, useEffect, useState } from "react";
import { setLogoutCallback } from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  //used this to make logout function accessible
  //in the axios interceptor without using hooks
  useEffect(() => {
    setLogoutCallback(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
