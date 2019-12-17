import PropTypes from "prop-types";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Feed from "../Route/Feed";
import Auth from "../Route/Auth/index"
import Explore from "../Route/Explore";
import Profile from "../Route/Profile/index";
import Search from "../Route/Search/index";
import Notification from "../Route/Notification";
import Post from "../Route/Post";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed}/>
        <Route path="/explore" component={Explore} />
        <Route path="/search" component={Search} />
        <Route path="/notifications" component={Notification} />
        <Route path="/post/:id" component={Post}/>
        <Route path="/:username" component={Profile}/>
        <Redirect from="*" to="/" />
    </Switch>
)

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth}/> 
        <Redirect from="*" to="/" />
    </Switch>
    )

const AppRouter = ({isLoggedIn}) => isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>; 


AppRouter.prototype = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;