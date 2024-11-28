// Reducer.js
export const reducers = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER_DATA":
      return {
        ...state,
        userData: {
          ...state.userData,
          access: action.payload.access,
          refresh: action.payload.refresh,
          isVerified: action.payload.isVerified,
        },
      };
    case "UPDATE_USER_DETAILS":
      // Fixed typo here: userDetail to userDetails
      const userDetails = { ...state.userDetails, ...action.payload }; // Corrected to userDetails
      return {
        ...state,
        userDetails: userDetails,
      };
    default:
      return state;
  }
};

export default reducers;
