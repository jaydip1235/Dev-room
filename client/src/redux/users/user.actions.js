import Axios from 'axios';
import * as alertActions from '../alerts/alert.actions';
import * as userUtil from '../../util/userUtil';
import * as authUtil from '../../util/authUtil';
import * as profileActions from '../profiles/profile.actions';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';

export const registerUser = (user, history) => {
    return async (dispatch) => {
        try {
            dispatch({type : REGISTER_USER_REQUEST});
            let dataUrl = `/api/users/register`;
            let response = await Axios.post(dataUrl, user);
            dispatch({type : REGISTER_USER_SUCCESS , payload : response.data});
            dispatch(alertActions.setAlert('Registration is Success' , 'success'));
            history.push('/users/login');
        }
        catch (error) {
            console.error(error);
            dispatch({type : REGISTER_USER_FAILURE , payload: {error : error}});
            let errorList = error.errors;
            for(let error of errorList){
                dispatch(alertActions.setAlert(error.msg , 'danger'))
            }
        }
    }
};

export const loginUser = (user, history) => {
    return async (dispatch) => {
        try {
            dispatch({type : LOGIN_USER_REQUEST});
            let dataUrl = `/api/users/login`;
            let response = await Axios.post(dataUrl, user);
            dispatch({type : LOGIN_USER_SUCCESS , payload : response.data});
            dispatch(alertActions.setAlert('Login is Success' , 'success'));
            dispatch(getUserInfo());
            history.push('/profiles/dashboard');
        }
        catch (error) {
            console.error(error);
            dispatch({type : LOGIN_USER_FAILURE , payload: {error : error}});
            dispatch(alertActions.setAlert("Invalid Credentials" , 'danger'))
        }
    }
};

// Private Request
export const getUserInfo = () => {
    return async (dispatch) => {
        try {
            if(userUtil.isLoggedIn()){
                let token = userUtil.getToken();
                authUtil.setAuthToken(token);

                dispatch({type : GET_USER_INFO_REQUEST});
                let dataUrl = `/api/users/me`;
                let response = await Axios.get(dataUrl);
                dispatch({type : GET_USER_INFO_SUCCESS , payload : response.data});
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : GET_USER_INFO_FAILURE , payload: {error : error}});
        }
    }
};

export const logoutUser = (history) => {
    return async (dispatch) => {
        try{
             dispatch({type : LOGOUT_USER});
             dispatch(profileActions.clearProfile());
             history.push('/');
        }
        catch (error) {
            console.error(error);
            dispatch({type : LOGIN_USER_FAILURE});
        }
    };
};
