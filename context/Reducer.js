import { storeUserDataAsync } from '../helper';

const reducers = (state, action) => {
    switch (action.type) {
        case "UPDATE_USER_DATA":
            const userData = { ...state.userData, ...action.payload };
            return {
                ...state,
                userData: userData,
            };
        case "UPDATE_USER_DETAILS":
            const userDetails = {...state.userDetail,...action.payload};
            return {
                ...state,
                userDetails:userDetails
            }
        default:
            return state;
    }
};

export default reducers;
