/*
Created Date: 2021.09.05 by Haodong GU
Modified on: 2021.09.15 by Le Minh Truong - Changes some routes to private to prevent unauthorized access
Modified on: 2021.09.16 by Le Minh Truong - Add routes for administrator login and registration
Modified on: 2021.10.19 by Chang Yi Lee - Add product page route and customer enter email page
This file defines the URL for each page of the application

*/
import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import { CustomerRegistrationForm } from "./components/registrationComponent"
import customerDetailComponent from "./components/customerDetailComponent"
import listsComponent  from './components/listsComponent'
import listComponent from './components/listComponent'
import addToListComponent from './components/addToListComponent'
import removeFromListComponent from './components/removeFromListComponent'
import createListComponent from './components/createListComponent'
import customerComponent  from './components/customerComponent';
import searchCustomerComponent  from './components/searchCustomerComponent';
import searchComponent  from './components/searchComponent';
import unassignedComponent  from './components/unassignedComponent';
import { UserSignupForm } from './components/signupComponent';
import SendEmail from './components/emailComponent';
import AdminLogin from './components/administratorLoginComponent';
import NotLoggedIn from './components/notLoggedInComponent';
import productPageComponent from './components/productPageComponent';
import customerLoginComponent from './components/customerLoginComponent';

import {isAdminAuthenticated} from "./components/authenticationComponent";
// import PublicRoute from "./components/publicRouteComponent";
import PrivateRoute from "./components/privateRouteComponent";
import emailToListComponent from './components/emailToListComponent';
import editCustomerDetailComponent from './components/editCustomerComponent';

require('dotenv').config();

function App() {
  document.title = "Team 60 CRM";
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={customerLoginComponent} />
        <Route path="/product" exact component={productPageComponent} />
        <Route path="/register" exact component={CustomerRegistrationForm} />
        <PrivateRoute path="/customer-detail-page/id=:id" authFunction={isAdminAuthenticated()} exact component={customerDetailComponent} />
        <PrivateRoute path="/customer-detail-page/id=:id/edit" authFunction={isAdminAuthenticated()} exact component={editCustomerDetailComponent} />
        <PrivateRoute path="/lists-all" authFunction={isAdminAuthenticated()} exact component={listsComponent} />
        <PrivateRoute path="/lists-all/:name" authFunction={isAdminAuthenticated()} exact component={listComponent} />
        <PrivateRoute path="/lists-all/:name/add" authFunction={isAdminAuthenticated()} exact component={addToListComponent} />
        <PrivateRoute path="/lists-all/:name/delete" authFunction={isAdminAuthenticated()} exact component={removeFromListComponent} />
        <PrivateRoute path="/createlist" authFunction={isAdminAuthenticated()} exact component={createListComponent} />
        <PrivateRoute path="/search" authFunction={isAdminAuthenticated()} exact component={searchComponent} />
        <PrivateRoute path="/customer-all" authFunction={isAdminAuthenticated()} exact component={customerComponent} />
        <PrivateRoute path="/search-customer" authFunction={isAdminAuthenticated()} exact component={searchCustomerComponent} />
        <PrivateRoute path="/unassigned-customer" authFunction={isAdminAuthenticated()} exact component={unassignedComponent} />
        <Route path="/login" exact component={AdminLogin} />
        <Route path="/signup" exact component={UserSignupForm} />
        <Route path="/notloggedin" exact component={NotLoggedIn} />
        <PrivateRoute path="/email" authFunction={isAdminAuthenticated()} exact component={SendEmail} />
        <PrivateRoute path="/lists-all/:name/emailToList" authFunction={isAdminAuthenticated()} exact component={emailToListComponent} />
      </Switch>
    </Router>
  )
}

export default App
