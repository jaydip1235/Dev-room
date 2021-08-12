import {v4} from 'uuid';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const setAlert = (message , color) => {
    return async (dispatch) => {
        try{
            let id = v4();
            dispatch({type : SET_ALERT , payload : {message , color , id}});
            setTimeout(() => {
                dispatch({type : REMOVE_ALERT , payload : {id}});
            }, 3000);
        }
        catch (error) {
            console.error(error);
        }
    };
};
