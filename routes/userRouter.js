const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
//require('../config/passport')(passport)

const userRouter = express.Router();

const userController = require('../controllers/userController.js');


// POST login form -- authendicate user
userRouter.post('/login', function(req, res, next) {
    passport.authenticate('local-login', async (err, user, info) => {
        try {
            // Check for server errors
            if (err) {
                console.log("this occur")
                console.log(err)
                const error = new Error("An Error has occurred");
                return next(error);
            }
            // Send if not valid combination of username/password
            if (!user) {
                console.log("That occur")
                res.status(200);
                res.send(false);
                return next();
            }   
            // Store the user's details using the req.login
            req.login(user, {session: false}, async (error) => {
                if (error){
                    //console.log(error);
                    return next(error);}
                
                    if (res.headersSent) {
                        console.log("Header has been sent at the beginning")
                    }

                    const body = {_id: user.username};

                    const token = jwt.sign({body}, process.env.PASSPORT_KEY);
                    
                    if (res.headersSent) {console.log("Header has been sent at this point")}
                    res.status(200);

                    if (res.headersSent) {console.log("Header has been sent at this point after status code")}
                    // and send the token 
                    res.cookie('user-jwt',token, { httpOnly: false, sameSite: false, secure: true, domain:"https://crm-t60.herokuapp.com"});
                    return res.json(token);
            });
        } catch (err) {
            console.log(err)
            return next (err);
        }
    })(req, res, next);
});

// POST - user submits the signup form -- signup a new user
userRouter.post('/signup', (req, res, next) => {
    passport.authenticate("local-signup", async (err, user, info) => {
        try {
            // Check for server errors
            if (err) {
                const error = new Error("An Error has occurred");
                return next(error);
            }

            // This probably means that the user has an account
            if (!user) {
                res.status(409); // Conflict
                return next();
            }   
            console.log("SUCCESS SIGNUP");
            // Store the user's details using the req.login
            req.login(user, {session: false}, async (error) => {
                if (error)
                    return next(error);
                
                    const body = {_id: user.username};

                    const token = jwt.sign({body}, process.env.PASSPORT_KEY);

                    res.status(200);

                    // and send the token 
                    res.cookie('jwt',token, { httpOnly: false, sameSite: false, secure: true, domain:"https://crm-t60.herokuapp.com"});
                    return res.json(token);
            })
        } catch (err) {
            return next (err);
        }
    })(req, res, next);
});

userRouter.post("/logout", function(req, res) {
    passport.authenticate("user-jwt", {session: false}),
    req.logout();
    res.redirect("/");
});

// handle the GET request to get all admins
userRouter.get('/', passport.authenticate("user-jwt", {session: false}), userController.getAllAdmins)
// Export the router
module.exports = userRouter;