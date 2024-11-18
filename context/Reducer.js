// Reducer.js
export const reducers = (state, action) => {
    switch (action.type) {
        case "UPDATE_USER_DATA":
            const userData = { ...state.userData, ...action.payload };
            return {
                ...state,
                userData: userData,
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
