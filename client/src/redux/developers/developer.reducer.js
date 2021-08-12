import * as developerActions from './developer.actions';

export const developerFeatureKey = 'developer-info';

let initialState = {
    loading : false,
    profiles : [],
    selectedProfile : {},
    errorMessage  : ''
};

export const reducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        // fetch all Developers
        case developerActions.FETCH_ALL_DEVELOPERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case developerActions.FETCH_ALL_DEVELOPERS_SUCCESS:
            return {
                ...state,
                loading: false,
                profiles: payload.profiles
            };
        case developerActions.FETCH_ALL_DEVELOPERS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        // Fetch a Developer
        case developerActions.FETCH_DEVELOPER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case developerActions.FETCH_DEVELOPER_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedProfile: payload.profile
            };
        case developerActions.FETCH_DEVELOPER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload.error
            };
        default : return state;
    }
};
