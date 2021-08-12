import * as profileActions from './profile.actions';

export const profileFeatureKey = 'profile-info';

let initialState = {
    loading : false,
    profile : {},
    errorMessage : ''
};

export const reducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        // Clear Profile
        case profileActions.CLEAR_PROFILE :
            return  {
                ...state,
                profile: {}
            }
        // Get Profile
        case profileActions.GET_PROFILE_REQUEST:
            return {
              ...state,
              loading: true
            };
        case profileActions.GET_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: payload.profile
            };
        case profileActions.GET_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        // Delete Experience
        case profileActions.DELETE_EXPERIENCE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.DELETE_EXPERIENCE_SUCCESS:
            return  {
                ...state,
                loading: false,
                profile: payload.profile
            };
        case profileActions.DELETE_EXPERIENCE_FAILURE:
            return  {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        // Delete Education
        case profileActions.DELETE_EDUCATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.DELETE_EDUCATION_SUCCESS:
            return  {
                ...state,
                loading: false,
                profile: payload.profile
            };
        case profileActions.DELETE_EDUCATION_FAILURE:
            return  {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        // Update Profile
        case profileActions.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: payload.profile
            };
        case profileActions.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        // Add Experience
        case profileActions.ADD_EXPERIENCE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.ADD_EXPERIENCE_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: payload.profile
            };
        case profileActions.ADD_EXPERIENCE_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        // Add Education
        case profileActions.ADD_EDUCATION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case profileActions.ADD_EDUCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: payload.profile
            };
        case profileActions.ADD_EDUCATION_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        default : return state;
    }
};
