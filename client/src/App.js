import React , {useEffect}from 'react';
import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Navbar from "./layout/navbar/Navbar";
import Home from "./layout/home/Home";
import DeveloperList from "./modules/developers/developer-list/DeveloperList";
import UserRegister from "./modules/users/user-register/UserRegister";
import UserLogin from "./modules/users/user-login/UserLogin";
import DeveloperDetails from "./modules/developers/developer-details/DeveloperDetails";
import Alert from "./layout/misc/alert/Alert";
import Dashboard from "./modules/profiles/dashboard/Dashboard";
import * as userActions from './redux/users/user.actions';
import {useDispatch} from "react-redux";
import EditProfile from "./modules/profiles/edit-profile/EditProfile";
import CreateProfile from "./modules/profiles/create-profile/CreateProfile";
import AddExperience from "./modules/profiles/add-experience/AddExperience";
import AddEducation from "./modules/profiles/add-education/AddEducation";
import PostList from "./modules/posts/post-list/PostList";
import PostDetails from "./modules/posts/post-details/PostDetails";
import PrivateRoute from "./util/PrivateRoute";
import Error from './layout/misc/Error/Error'
let App = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getUserInfo());
    }, []);

  return (
    <React.Fragment>
      <Router>
          <Navbar/>
          <Alert/>
          <Switch>
              <Route exact path="/" component={Home}/>
              <PrivateRoute exact path="/profiles/dashboard" component={Dashboard}/>
              <Route exact path="/developers" component={DeveloperList}/>
              <Route exact path="/developers/:developerId" component={DeveloperDetails}/>
              <Route exact path="/users/register" component={UserRegister}/>
              <Route exact path="/users/login" component={UserLogin}/>
              <PrivateRoute exact path="/profiles/edit-profile" component={EditProfile}/>
              <PrivateRoute exact path="/profiles/create-profile" component={CreateProfile}/>
              <PrivateRoute exact path="/profiles/edit-profile" component={EditProfile}/>
              <PrivateRoute exact path="/profiles/add-experience" component={AddExperience}/>
              <PrivateRoute exact path="/profiles/add-education" component={AddEducation}/>
              <PrivateRoute exact path="/posts/list" component={PostList}/>
              <PrivateRoute exact path="/posts/:postId" component={PostDetails}/>
              <Route component={Error}/>
          </Switch>
      </Router>

    </React.Fragment>
  );
}
export default App;
