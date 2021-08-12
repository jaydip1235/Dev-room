import * as postActions from './post.actions';

export const postsFeatureKey = 'post-info';

let initialState = {
    loading : false,
    posts : [],
    selectedPost : {},
    errorMessage : ''
};

export const reducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        // Get All Posts
        case postActions.GET_ALL_POSTS_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.GET_ALL_POSTS_SUCCESS:
            return {
                ...state,
                loading : false,
                posts: payload.posts
            };
        case postActions.GET_ALL_POSTS_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage: payload.error
            };
        // Create Post
        case postActions.CREATE_POST_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.CREATE_POST_SUCCESS:
            return {
                ...state,
                loading : false,
                posts: [...state.posts , payload.post]
            };
        case postActions.CREATE_POST_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage: payload.error
            };
        // Get a Post
        case postActions.GET_POST_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.GET_POST_SUCCESS:
            return {
                ...state,
                loading : false,
                selectedPost: payload.post
            };
        case postActions.GET_POST_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage: payload.error
            };
        // Delete a Post
        case postActions.DELETE_POST_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.DELETE_POST_SUCCESS:
            return {
                ...state,
                loading : false,
                posts: state.posts.filter(post => post._id !== payload.post._id)
            };
        case postActions.DELETE_POST_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage: payload.error
            };
        // Like a Post
        case postActions.LIKE_POST_REQUEST:
            return {
                ...state,
                loading : false
            };
        case postActions.LIKE_POST_SUCCESS:
            let likedPosts = state.posts.map(post => {
                if(post._id === payload.post._id){
                    return payload.post;
                }
                else{
                    return post;
                }
            })
            return {
                ...state,
                loading : false,
                posts: [...likedPosts]
            };
        case postActions.LIKE_POST_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage: payload.error
            };
        // Un-Like a Post
        case postActions.UNLIKE_POST_REQUEST:
            return {
                ...state,
                loading : false
            };
        case postActions.UNLIKE_POST_SUCCESS:
            let unLikedPosts = state.posts.map(post => {
                if(post._id === payload.post._id){
                    return payload.post;
                }
                else{
                    return post;
                }
            })
            return {
                ...state,
                loading : false,
                posts: [...unLikedPosts]
            };
        case postActions.UNLIKE_POST_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage: payload.error
            };
        // Create a Comment
        case postActions.CREATE_COMMENT_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading : false,
                selectedPost: payload.post
            };
        case postActions.CREATE_COMMENT_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage: payload.error
            };
        // Delete a Comment
        case postActions.DELETE_COMMENT_REQUEST:
            return {
                ...state,
                loading : true
            };
        case postActions.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading : false,
                selectedPost: payload.post
            };
        case postActions.DELETE_COMMENT_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage: payload.error
            };
        default : return state;
    }
};
