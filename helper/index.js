import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserDataAsync = async (userData) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
        console.error("Error saving user data:", error);
    }
};
export function roundTo(n, precision) {
    "use strict";
  
    // Return the rounded number.
    return Math.round(n * (10 ** precision)) / (10 ** precision);
  }
  export const formattedDate = (date) => {
    date = new Date(date); // Ensure date is a JavaScript Date object
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  export function getAMorPM(datetimeString) {
    const dateTime = new Date(datetimeString);
    const hours = dateTime.getHours();
    
    if (hours >= 0 && hours < 12) {
      return "AM";
    } else {
      return "PM";
    }
  }