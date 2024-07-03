import React from "react";
import {Route, Redirect} from 'react-router-dom';

import {isAdminAuthenticated} from "./authenticationComponent";

// Similar to PrivateRoute, but this time ensures only
// users who aren't logged in see the page
const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAdminAuthenticated() === false
        ? <Component {...props} />
        // Redirect to index if logged in
        : <Redirect to='/' />
    )} />
);

export default PublicRoute;