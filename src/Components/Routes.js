import PropTypes from "prop-types";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Feed from "../Route/Feed";
import Auth from "../Route/Auth/index"
import Explore from "../Route/Explore";
import Profile from "../Route/Profile";
import Search from "../Route/Search";
import Notification from "../Route/Notification";

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed}/>
        <Route path="/explore" component={Explore} />
        <Route path="/search" component={Search} />
        <Route path="/notifications" component={Notification} />
        <Route path="/:username" component={Profile}/>
    </Switch>
)

const LoggedOutRoutes = () => <Switch><Route exact path="/" component={Auth}/> </Switch>

const AppRouter = ({isLoggedIn}) => isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>; 


AppRouter.prototype = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;