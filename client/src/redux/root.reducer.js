import {combineReducers} from "redux";
import * as developerReducer from './developers/developer.reducer';
import * as userReducer from './users/user.reducer';
import * as alertReducer from './alerts/alert.reducer';
import * as profileReducer from './profiles/profile.reducer';
import * as postReducer from './posts/post.reducer';

export const rootReducer = combineReducers({
    [developerReducer.developerFeatureKey] : developerReducer.reducer,
    [userReducer.usersFeatureKey] : userReducer.reducer,
    [alertReducer.alertFeatureKey] : alertReducer.reducer,
    [profileReducer.profileFeatureKey] : profileReducer.reducer,
    [postReducer.postsFeatureKey] : postReducer.reducer
});
