import Axios from 'axios';

export const setAuthToken = (token) => {
    if(token){
        Axios.defaults.headers.common['x-auth-token'] = token;
    }
    else{
        delete Axios.defaults.headers.common['x-auth-token'];
    }
};
