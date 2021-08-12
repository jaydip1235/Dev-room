import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import * as postActions from '../../../redux/posts/post.actions';
import * as postReducer from '../../../redux/posts/post.reducer';
import * as userReducer from '../../../redux/users/user.reducer';
import Spinner from "../../../layout/misc/spinner/Spinner";

let PostDetails = () => {
    let [comment , setComment] = useState({
        text : ''
    });

    let dispatch = useDispatch();
    let postId = useParams().postId;

    let postInfo = useSelector((state) => {
        return state[postReducer.postsFeatureKey];
    });

    let userInfo = useSelector((state) => {
        return state[userReducer.usersFeatureKey];
    });

    let {user} = userInfo;

    let {loading , selectedPost} = postInfo;

       
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

    useEffect(() => {
        dispatch(postActions.getPost(postId));
    }, [postId]);

    let submitCreateComment = (e) => {
        e.preventDefault();
        dispatch(postActions.createComment(comment , postId));
        setComment({
            text : ''
        });
    };

    let clickDeleteComment = (commentId) => {
       dispatch(postActions.deleteComment(postId , commentId));
    };

    return (
        <React.Fragment>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        <section className="p-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <Link to="/posts/list" className="btn bg-light-grey btn-sm">back</Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        {
                                            Object.keys(selectedPost).length > 0 &&
                                            <div className="card">
                                                <div className="card-body bg-light-grey">
                                                    <div className="row">
                                                        <div className="col-md-2 text-center">
                                                            <img src={selectedPost.avatar} alt="" className="rounded-circle" width="60" height="60"/><br/>
                                                            <small>{selectedPost.name}</small>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <img src={selectedPost.image} alt="" className="img-fluid d-block m-auto"/>
                                                                </div>
                                                            </div>
                                                            <p style={{fontWeight: "bold"}}>{selectedPost.text}</p>
                                                            <small>{timeDifference(new Date(), new Date(selectedPost.createdAt))}</small>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col">
                                                            <form onSubmit={submitCreateComment}>
                                                                <div className="input-group mb-1">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text" id="basic-addon1">
                                                                            <img src={user.avatar} alt="" width="50" height="50" className="rounded-circle"/>
                                                                        </span>
                                                                    </div>
                                                                    <textarea
                                                                        required
                                                                        name="text"
                                                                        value={comment.text}
                                                                        onChange={e => setComment({text : e.target.value})}

                                                                        rows="3" className="form-control" placeholder="Whats on your mind.."
                                                                        style={{height:"100px", width:"100px",resize: "none"}}/>
                                                                        
                                                                </div>
                                                                <div>
                                                                    <input type="submit" className="btn btn-teal btn-sm" value="Comment"/>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            { Object.keys(selectedPost).length > 0 &&
                                selectedPost.comments.length > 0 &&
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            {
                                                selectedPost.comments.map(comment => {
                                                    return (
                                                        <div className="card mt-3" key={comment._id}>
                                                            <div className="card-body bg-comment">
                                                                <div className="row">
                                                                    <div className="col-md-2">
                                                                        <img src={comment.avatar} alt="" className="rounded-circle" width="50" height="50"/>
                                                                        <br/>
                                                                        <small>{comment.name}</small>
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <p style={{fontWeight : "bold"}}>{comment.text}</p>
                                                                        {
                                                                            comment.user === user._id ?
                                                                                <button className="btn btn-danger btn-sm" onClick={clickDeleteComment.bind(this,comment._id)}>
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
                        </section>
                    </React.Fragment>
            }
        </React.Fragment>
    )
};
export default PostDetails;
