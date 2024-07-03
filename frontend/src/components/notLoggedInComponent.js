//import React, { Component } from 'react';
import logo from '../images/admin.jpg';
import { Link } from 'react-router-dom';
import '../styles/notLoggedIn.scss';

 const NotLoggedIn = () => {
     return (
        <div className="center-screen">
            <center><img src={logo} alt="logo" width = "150" height = "150"/></center>
            <h1>It seems you are not logged in!</h1>
            <center><button><Link to={"/login"} className="button-black">Go to Login?</Link></button></center>
        </div>
        )
 }

 export default NotLoggedIn