import axios from "axios";

import { 
    deauthenticateAdmin,
} from "./components/authenticationComponent";

const getBaseURL = () => {
    // test if running on heroku
    if (process.env.NODE_ENV === "production"){
        return "https://crm-t60.herokuapp.com/"

    }
    
    // otherwise we running on localhost
    else {
        return "http://localhost:3000/"
    }
}

// because the headers are different
const userAxios = axios.create({
    baseURL: getBaseURL()
});


// Some headers that will be sent with every request
userAxios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.baseURL);
        const allowedOrigins = ["http://localhost:5000", "https://crm-t60.herokuapp.com", "http://localhost:3000"]
        const token = localStorage.getItem('cToken');

        if (allowedOrigins.includes(origin)) {
            // & putting the token in the header
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }
);

userAxios.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error)
    if (error.response.status === 401) {
        // remove their invalid token
         deauthenticateAdmin();
         // send them away
         window.location.replace("/login");
     }
     return Promise.reject(error);
})

export {
    userAxios
}