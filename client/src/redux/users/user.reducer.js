import * as userActions from './user.actions';

export const usersFeatureKey = 'user-info';

let initialState = {
    loading : false,
    token : '',
    user : {} ,
    isAuthenticated : false,
    errorMessage : ''
};

export const reducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        // Register a User
        case userActions.REGISTER_USER_REQUEST :
            return {
                ...state,
                loading: true
            };
        case userActions.REGISTER_USER_SUCCESS :
            return {
                ...state,
                loading: false
            };
        case userActions.REGISTER_USER_FAILURE :
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        // Login a User
        case userActions.LOGIN_USER_REQUEST :
            return {
                ...state,
                loading: true
            };
        case userActions.LOGIN_USER_SUCCESS :
            localStorage.setItem('react-social-token', payload.token);
            return {
                ...state,
                loading: false,
                token: payload.token,
                isAuthenticated: true
            };
        case userActions.LOGIN_USER_FAILURE :
            localStorage.removeItem('react-social-token');
            return {
                ...state,
                loading: false,
                user : {},
                token: '',
                isAuthenticated: false,
                errorMessage: payload.error
            };
        //Get User Info
        case userActions.GET_USER_INFO_REQUEST :
            return {
                ...state,
                loading: true
            };
        case userActions.GET_USER_INFO_SUCCESS :
            return {
                ...state,
                loading: false,
                user : payload.user,
                isAuthenticated: true
            };
        case userActions.GET_USER_INFO_FAILURE :
            return {
                ...state,
                loading: false,
                user : {},
                isAuthenticated: false,
                errorMessage: payload.error
            };
         // Logout User
        case userActions.LOGOUT_USER :
            localStorage.removeItem('react-social-token');
            return {
                ...state,
                loading: false,
                user : {},
                token: '',
                isAuthenticated: false
            }
        case userActions.LOGOUT_USER_FAILURE:
            return {
                ...state
            }
        default : return state;
    }
};
