/*
Created Date: 2021.09.23 by Haodong GU
Modified on: 
Brief Introduction: Dashboard side bar
*/

import React from 'react';
import { Link } from 'react-router-dom'
import {deauthenticateAdmin} from "./authenticationComponent"

const handleLogout = () => {
    deauthenticateAdmin();
    window.location="/login";
}

const DashboardTemplate = () => {
    return (
        <div>
            <div>
                <header className = 'dashBoardSidebar'>
                <h1 style={{color: "white", textAlign:"center",  paddingTop:"10px"}}>Dashboard</h1>
                <Link className="dashboardLinkMark" style={{textDecoration:"none", paddingTop:"75%"}}to={`/customer-all`}>Customers</Link>
                <Link className="dashboardLinkMark" style={{textDecoration:"none", paddingTop:"25%"}}to={`/lists-all`}>Lists</Link>
                <Link className="dashboardLinkMark" style={{textDecoration:"none", paddingTop:"25%"}} onClick={handleLogout}>Log out</Link>
                {/* <Link className="dashboardLinkMark" style={{textDecoration:"none"}}to={`/customer-registration-page`}>Customer Contacts</Link> */}
                </header>
            </div>
        </div>
    )
}

export {DashboardTemplate};