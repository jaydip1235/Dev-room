import Axios from 'axios';
import * as userUtil from "../../util/userUtil";
import * as authUtil from "../../util/authUtil";
import * as alertActions from '../alerts/alert.actions';

export const CLEAR_PROFILE = 'CLEAR_PROFILE';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const CREATE_PROFILE_REQUEST = 'CREATE_PROFILE_REQUEST';
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS';
export const CREATE_PROFILE_FAILURE = 'CREATE_PROFILE_FAILURE';

export const DELETE_EXPERIENCE_REQUEST = 'DELETE_EXPERIENCE_REQUEST';
export const DELETE_EXPERIENCE_SUCCESS = 'DELETE_EXPERIENCE_SUCCESS';
export const DELETE_EXPERIENCE_FAILURE = 'DELETE_EXPERIENCE_FAILURE';

export const DELETE_EDUCATION_REQUEST = 'DELETE_EDUCATION_REQUEST';
export const DELETE_EDUCATION_SUCCESS = 'DELETE_EDUCATION_SUCCESS';
export const DELETE_EDUCATION_FAILURE = 'DELETE_EDUCATION_FAILURE';

export const ADD_EXPERIENCE_REQUEST = 'ADD_EXPERIENCE_REQUEST';
export const ADD_EXPERIENCE_SUCCESS = 'ADD_EXPERIENCE_SUCCESS';
export const ADD_EXPERIENCE_FAILURE = 'ADD_EXPERIENCE_FAILURE';

export const ADD_EDUCATION_REQUEST = 'ADD_EDUCATION_REQUEST';
export const ADD_EDUCATION_SUCCESS = 'ADD_EDUCATION_SUCCESS';
export const ADD_EDUCATION_FAILURE = 'ADD_EDUCATION_FAILURE';

export const clearProfile = () => {
    return async (dispatch) => {
        try{
            dispatch({type : CLEAR_PROFILE});
        }
        catch (error) {
            console.error(error);
        }
    };
};

export const getProfile = () => {
    return async (dispatch) => {
        try{
            if(userUtil.isLoggedIn()) {
                let token = userUtil.getToken();
                authUtil.setAuthToken(token);
                dispatch({type : GET_PROFILE_REQUEST});
                let dataUrl = '/api/profiles/me';
                let response = await Axios.get(dataUrl);
                dispatch({type : GET_PROFILE_SUCCESS , payload : response.data});
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : GET_PROFILE_FAILURE , payload : {error : error}});
        }
    };
};

export const deleteExperience = (experienceId) => {
    return async (dispatch) => {
        try{
            if(userUtil.isLoggedIn()) {
                let token = userUtil.getToken();
                authUtil.setAuthToken(token);
                dispatch({type : DELETE_EXPERIENCE_REQUEST});
                let dataUrl = `/api/profiles/experience/${experienceId}`;
                let response = await Axios.delete(dataUrl);
                dispatch({type : DELETE_EXPERIENCE_SUCCESS , payload : response.data});
                dispatch(alertActions.setAlert('Experience is Deleted' , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : DELETE_EXPERIENCE_FAILURE , payload : {error : error}});
        }
    };
};

export const deleteEducation = (educationId) => {
    return async (dispatch) => {
        try{
            if(userUtil.isLoggedIn()) {
                let token = userUtil.getToken();
                authUtil.setAuthToken(token);
                dispatch({type : DELETE_EDUCATION_REQUEST});
                let dataUrl = `/api/profiles/education/${educationId}`;
                let response = await Axios.delete(dataUrl);
                dispatch({type : DELETE_EDUCATION_SUCCESS , payload : response.data});
                dispatch(alertActions.setAlert('Education is Deleted' , 'success'));
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : DELETE_EDUCATION_FAILURE , payload : {error : error}});
        }
    };
};

export const updateProfile = (profile , history) => {
    return async (dispatch) => {
        try{
            if(userUtil.isLoggedIn()) {
                let token = userUtil.getToken();
                authUtil.setAuthToken(token);
                dispatch({type : UPDATE_PROFILE_REQUEST});
                let dataUrl = '/api/profiles/';
                let response = await Axios.put(dataUrl, profile);
                dispatch({type : UPDATE_PROFILE_SUCCESS , payload : response.data});
                dispatch(alertActions.setAlert('Profile is Updated' , 'success'));
                history.push('/profiles/dashboard');
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : UPDATE_PROFILE_FAILURE , payload : {error : error}});
        }
    };
};

export const createProfile = (profile , history) => {
    return async (dispatch) => {
        try{
            if(userUtil.isLoggedIn()) {
                let token = userUtil.getToken();
                authUtil.setAuthToken(token);
                dispatch({type : CREATE_PROFILE_REQUEST});
                let dataUrl = '/api/profiles/';
                let response = await Axios.post(dataUrl, profile);
                dispatch({type : CREATE_PROFILE_SUCCESS , payload : response.data});
                dispatch(alertActions.setAlert('Profile is Created' , 'success'));
                history.push('/profiles/dashboard');
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : CREATE_PROFILE_FAILURE , payload : {error : error}});
        }
    };
};

export const addExperience = (experience , history) => {
    return async (dispatch) => {
        try{
            if(userUtil.isLoggedIn()) {
                let token = userUtil.getToken();
                authUtil.setAuthToken(token);
                dispatch({type : ADD_EXPERIENCE_REQUEST});
                let dataUrl = '/api/profiles/experience/';
                let response = await Axios.put(dataUrl, experience);
                dispatch({type : ADD_EXPERIENCE_SUCCESS , payload : response.data});
                dispatch(alertActions.setAlert('Experience is Added' , 'success'));
                history.push('/profiles/dashboard');
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : ADD_EXPERIENCE_FAILURE , payload : {error : error}});
        }
    };
};

export const addEducation = (education , history) => {
    return async (dispatch) => {
        try{
            if(userUtil.isLoggedIn()) {
                let token = userUtil.getToken();
                authUtil.setAuthToken(token);
                dispatch({type : ADD_EDUCATION_REQUEST});
                let dataUrl = '/api/profiles/education/';
                let response = await Axios.put(dataUrl, education);
                dispatch({type : ADD_EDUCATION_SUCCESS , payload : response.data});
                dispatch(alertActions.setAlert('Education is Added' , 'success'));
                history.push('/profiles/dashboard');
            }
        }
        catch (error) {
            console.error(error);
            dispatch({type : ADD_EDUCATION_FAILURE , payload : {error : error}});
        }
    };
};
