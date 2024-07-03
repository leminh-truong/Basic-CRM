/*
Created Date: 2021.09.18 by Le Minh Truong
This file defines Private Routes which prevents unauthenticated users from 
viewing routes they are not meant to see

*/
import React from "react";
import {Route, Redirect} from 'react-router-dom';

// Redirects all "Private" routes to the notloggedin page
// if the user is not authenticated
// Adopted method from https://ui.dev/react-router-v4-protected-routes-authentication/
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.authFunction === true
        ? <Component {...props} />
        : <Redirect to='/notloggedin' />
    )} />
);

export default PrivateRoute;