import Axios from 'axios';

export const FETCH_ALL_DEVELOPERS_REQUEST = 'FETCH_ALL_DEVELOPERS_REQUEST';
export const FETCH_ALL_DEVELOPERS_SUCCESS = 'FETCH_ALL_DEVELOPERS_SUCCESS';
export const FETCH_ALL_DEVELOPERS_FAILURE = 'FETCH_ALL_DEVELOPERS_FAILURE';

export const FETCH_DEVELOPER_REQUEST = 'FETCH_DEVELOPER_REQUEST';
export const FETCH_DEVELOPER_SUCCESS = 'FETCH_DEVELOPER_SUCCESS';
export const FETCH_DEVELOPER_FAILURE = 'FETCH_DEVELOPER_FAILURE';

export const fetchAllDevelopers = () => {
    return async (dispatch) => {
        try {
            dispatch({type : FETCH_ALL_DEVELOPERS_REQUEST});
            let dataUrl = '/api/profiles/all';
            let response = await Axios.get(dataUrl);
            dispatch({type : FETCH_ALL_DEVELOPERS_SUCCESS , payload : response.data});
        }
        catch (error) {
            console.error(error);
            dispatch({type : FETCH_ALL_DEVELOPERS_FAILURE , payload : {error : error}})
        }
    };
};

export const fetchDeveloper = (developerId) => {
    return async (dispatch) => {
        try {
            dispatch({type : FETCH_DEVELOPER_REQUEST});
            let dataUrl = `/api/profiles/${developerId}`;
            let response = await Axios.get(dataUrl);
            dispatch({type : FETCH_DEVELOPER_SUCCESS , payload : response.data});
        }
        catch (error) {
            console.error(error);
            dispatch({type : FETCH_DEVELOPER_FAILURE , payload : {error : error}});
        }
    }
};
