import React, {useState} from 'react';
import {Link ,useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import * as userActions from '../../../redux/users/user.actions';
import * as alertActions from '../../../redux/alerts/alert.actions';

let UserRegister = () => {
    let dispatch = useDispatch();
    let history = useHistory();

    let [user , setUser] = useState({
        name : '',
        email : '',
        password : ''
    });

    let [userError , setUserError] = useState({
        nameError : '',
        emailError : '',
        passwordError : ''
    });

    let validateUsername = (event) => {
        setUser({...user , name : event.target.value});
        let regExp = /^[a-zA-Z0-9]/;
        !regExp.test(event.target.value) ?
            setUserError({...userError , nameError: 'Enter a proper Username'})
            : setUserError({...userError , nameError: ''});
    }

    let validateEmail = (event) => {
        setUser({...user , email : event.target.value});
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(event.target.value) || event.target.value.trim()=="" ?
            setUserError({...userError , emailError: 'Enter a proper Email'})
            : setUserError({...userError , emailError: ''});
    }

    let validatePassword = (event) => {
        setUser({...user , password : event.target.value});
        if(event.target.value.trim()=="")
            setUserError({...userError , passwordError: 'Enter a proper Password'})
         else setUserError({...userError , passwordError: ''});
    }

    let submitRegistration = (event) => {
        event.preventDefault();
        if(user.name.trim() !== '' && user.email.trim() !== '' && user.password.trim() !== ''){
            dispatch(userActions.registerUser(user , history));
            console.log(user);
        }
        else{
            dispatch(alertActions.setAlert('Please fill in all the fields' , 'danger'));
        }
    };

    return (
        <React.Fragment>
            {/* <pre>{JSON.stringify(userError)}</pre> */}
            <section className="p-3">
                <div className="container">
                    <div className="row animated zoomIn">
                        <div className="col">
                            <p className="h3 text-teal">
                               <i className="fa fa-user-shield"/> Registration</p>
                            <p>Register to Dev-room</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row animated zoomIn">
                        <div className="col-md-8">
                            <form onSubmit={submitRegistration}>
                                <div className="form-group">
                                    <input
                                    required
                                        name="name"
                                        value={user.name}
                                        onChange={validateUsername}
                                        type="text" className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : ''}`} placeholder="Name"/>
                                    {userError.nameError.length > 0 ? <small className="text-danger">{userError.nameError}</small> : ''}
                                </div>
                                <div className="form-group">
                                    <input
                                    required
                                        name="email"
                                        value={user.email}
                                        onChange={validateEmail}
                                        type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Email"/>
                                    {userError.emailError.length > 0 ? <small className="text-danger">{userError.emailError}</small> : ''}
                                </div>
                                <div className="form-group">
                                    <input
                                    required
                                        name="password"
                                        value={user.password}
                                        onChange={validatePassword}
                                        type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Password"/>
                                    {userError.passwordError.length > 0 ? <small className="text-danger">{userError.passwordError}</small> : ''}
                                </div>
                                <div>
                                    <input type="submit" className="btn btn-teal btn-sm" value="Register"/>
                                </div>
                            </form>
                            <small>Already have an account ?
                                <Link to="/users/login" className="font-weight-bold text-teal"> Login</Link>
                            </small>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};
export default UserRegister;
