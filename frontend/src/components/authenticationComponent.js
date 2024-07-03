/*
Created Date: 2021.09.17 by Le Minh Truong
This file allows for authentication and deauthentication of administrators

*/
const authenticateAdmin = (token) => {
    localStorage.setItem("cToken", token);
}

// Removes the token from the localStorage
const deauthenticateAdmin = () => {
    localStorage.removeItem("cToken");
}

const isAdminAuthenticated = () => {
    return localStorage.getItem("cToken") !== null;
}

export {
    authenticateAdmin,
    isAdminAuthenticated,
    deauthenticateAdmin
}