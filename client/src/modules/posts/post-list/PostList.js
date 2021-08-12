import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import * as userReducer from '../../../redux/users/user.reducer';
import * as userAction from '../../../redux/users/user.actions';
import * as postActions from '../../../redux/posts/post.actions';
import * as postReducer from '../../../redux/posts/post.reducer';
import Spinner from "../../../layout/misc/spinner/Spinner";
import { text } from 'body-parser';

let PostList = () => {
    let [localPost , setLocalPost] = useState({
        text : '',
        image : '',

    });

    let dispatch = useDispatch();

    let userInfo = useSelector((state) => {
        return state[userReducer.usersFeatureKey];
    });

    let {user} = userInfo;

    let postInfo = useSelector((state) => {
        return state[postReducer.postsFeatureKey];
    });

    
function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if(elapsed/1000 < 30) return "Just now";
        
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

    let {loading , posts} = postInfo;

    useEffect(() => {
        
        dispatch(postActions.getAllPosts());
    }, []);

    let updateInput = (e) => {
        setLocalPost({
            ...localPost,
            [e.target.name] : e.target.value
        });
    };

    let submitCreatePost = (e) => {
        e.preventDefault();
        if(localPost.text.trim()!=='')
        dispatch(postActions.createPost(localPost));
      
        setLocalPost({
            text : '',
            image: ''
        });
    };

    let clickDeletePost = (postId) => {
        dispatch(postActions.deletePost(postId));
    };

    let clickLikePost = (postId) => {
        dispatch(postActions.likePost(postId));
        

    };

    let clickUnLikePost = (postId) => {
        dispatch(postActions.unlikePost(postId));
    };

    return (
        <React.Fragment>
           {/* { <pre>{JSON.stringify(posts)}</pre> } */}
        
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-teal">
                                Welcome to Dev-Room Posts
                            </p>
                            <p>Post your achievements, suceess and needs and share with other developers!</p>
                        </div>
                    </div>
                    <div className="row">
                        {
                            Object.keys(user).length > 0 &&
                            <div className="col-md-8">
                                <form onSubmit={submitCreatePost}>
                                    <div className="input-group mb-1">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <img src={user.avatar} alt="" width="50" height="50" className="rounded-circle"/>
                                        </span>
                                        </div>
                                        <textarea
                                            required
                                            name="text"
                                            value={localPost.text}
                                            onChange={updateInput}
                                            rows="3" className="form-control" placeholder="Whats on your mind.."
                                            style={{height:"100px", width:"100px",resize: "none"}}/>
                                    </div>
                                    <div className="input-group mb-1">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            Image Url
                                        </span>
                                        </div>
                                        <input
                                            name="image"
                                            value={localPost.image}
                                            onChange={updateInput}
                                            type="text" className="form-control" placeholder="Image Url"/>
                                    </div>
                                    <div>
                                        <input type="submit" className="btn btn-teal btn-sm" value="Post"/>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                    <hr/>
                </div>
            </section>
            <section>
                {
                    loading ? <Spinner/> :
                        <React.Fragment>
                            {
                                posts.length > 0 &&
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            {
                                               posts.slice(0).reverse().map(post => {
                                                    return (
                                                        <div className="card my-2" key={post._id}>
                                                            <div className="card-body bg-light-grey">
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <img src={post.user.avatar} alt="" className="rounded-circle" width="50" height="50"/><br/>
                                                                        <small>{post.name}</small>
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <img src={post.image} alt="" className="img-fluid d-block m-auto"/>
                                                                            </div>
                                                                        </div>
                                                                        <p style={{fontWeight : "bold"}}>{post.text}</p>
                                                                        <small>{timeDifference(new Date(), new Date(post.createdAt))}</small><br/>
                                                                        {
                                                                            
                                                                            post.likes.includes(user._id)?
                                                                
                                                                            <button className="btn btn-like btn-sm" onClick={clickLikePost.bind(this,post._id)} 
                                                                            style={{color: 'white'}}>
                                                                            <i className="fa fa-thumbs-up" style={{color:"white"}}/> {post.likes.length}
                                                                            
                                                                        </button>:
                                                                        <button className="btn btn-primary btn-sm" onClick={clickLikePost.bind(this,post._id)}>
                                                                        <i className="fa fa-thumbs-up"/> {post.likes.length}
                                                                    </button>
                                                                    
                                                                        }
                                                    
                                                                        <Link to={`/posts/${post._id}`} className="btn btn-warning btn-sm">
                                                                            <i className="fab fa-facebook-messenger"/> Discussions {post.comments.length}
                                                                        </Link>
                                                                        {
                                                                            post.user._id === user._id ?
                                                                            <button className="btn btn-danger btn-sm" onClick={clickDeletePost.bind(this,post._id)}>
                                                                                <i className="fa fa-times-circle"/>
                                                                            </button> : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            }
                        </React.Fragment>
                }
            </section>
        </React.Fragment>
    )
};
export default PostList;
