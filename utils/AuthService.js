let logoutCallback = null;

export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

export const logout = () => {
  if (logoutCallback) {
    logoutCallback();
  }
};
