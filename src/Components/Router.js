import PropTypes from "prop-types";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "../Route/Feed";
import Auth from "../Route/Auth/index";

const LoggedInRoutes = () => <><Route exact path="/" component={Feed}/> </>

const LoggedOutRoutes = () => <><Route exact path="/" component={Auth}/> </>

const AppRouter = ({isLoggedIn}) => (
    <Router>
        <Switch>{isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/>} </Switch>
    </Router>
);

AppRouter.prototype = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;