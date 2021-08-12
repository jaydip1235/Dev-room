import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as userActions from "../../../redux/users/user.actions";
import * as alertActions from '../../../redux/alerts/alert.actions';

let UserLogin = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [user , setUser] = useState({
        email : '',
        password : ''
    });

    let [userError , setUserError] = useState({
        emailError : '',
        passwordError : ''
    });

    let validateEmail = (event) => {
        setUser({...user , email : event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , emailError: 'Enter a proper Email'})
            : setUserError({...userError , emailError: ''});
    }

    let validatePassword = (event) => {
        setUser({...user , password : event.target.value});
        if(event.target.value.trim()=="")
            setUserError({...userError , passwordError: 'Enter a proper Password'})
         else setUserError({...userError , passwordError: ''});
    }
    let submitLogin = (event) => {
        event.preventDefault();
        if(user.email !== '' && user.password !== ''){
            dispatch(userActions.loginUser(user , history));
            console.log(user);
        }
        else{
            dispatch(alertActions.setAlert('Please fill in  the fields' , 'danger'));
        }
    };

    return (
        <React.Fragment>
            <section className="p-3">
                <div className="container">
                    <div className="row animated zoomIn">
                        <div className="col">
                            <p className="h3 text-teal">
                                <i className="fa fa-sign-in-alt"/> Login</p>
                            <p>Login into Dev-room</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 animated zoomIn">
                            <form onSubmit={submitLogin}>
                                <div className="form-group">
                                    <input
                                        name="email"
                                        required
                                        value={user.email}
                                        onChange={validateEmail}
                                        type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Email"/>
                                    {userError.emailError.length > 0 ? <small className="text-danger">{userError.emailError}</small> : ''}
                                </div>
                                <div className="form-group">
                                    <input
                                        name="password"
                                        required
                                        value={user.password}
                                        onChange={validatePassword}
                                        type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Password"/>
                                    {userError.passwordError.length > 0 ? <small className="text-danger">{userError.passwordError}</small> : ''}
                                </div>
                                <div>
                                    <input type="submit" className="btn btn-teal btn-sm" value="Login"/>
                                </div>
                            </form>
                            <small>Don't have an account ?
                                <Link to="/users/register" className="font-weight-bold text-teal"> Register</Link>
                            </small>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default UserLogin;
