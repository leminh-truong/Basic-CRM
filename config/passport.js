/*
Created Date: 2021.09.27 by Tung Lam Nguyen
Modified on: 
Brief Introduction: Passport to configure the login
*/
require('dotenv').config()  // For JwT password key

// Used to create the local strategy for authendicating
// using username and password
const LocalStrategy = require('passport-local').Strategy;

// The admin model
const Administrator = require('../models/administrator');

// 
const passportJwt = require('passport-jwt');
const JwtStrategy = require("passport-jwt");

module.exports = function(passport) {
    const passport = require('passport');
    // Functions to store information in and retrieve data from sessions. Using administrator's object id
    passport.serializeUser(function(user, done){
        done(null, user._id);
    })

    passport.deserializeUser(function(_id, done){
        Administrator.findById(_id, function(err, user){
            done(err, user);
        });
    });

    // Strategy to login
    // This method only takes in username and password, and the field names should match
    // those in the log in form
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        // function(req, username, password, done) {
        async function(username, password, done) {
            try {
                // Find the user then only return the user and password
                await Administrator.findOne({username: username}, 'username password', async function (err, user) {
                    // First see if errored
                    if (err)
                        return done(err);
    
                    // and for no user with that email
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username or password' });
                    }
    
                    // See if the password matches
                    const isMatch = await user.validPassword(password);
    
                    if (!isMatch) {
                        return done(null, false, { message: 'Incorrect username or password' });
                    }
    
                    // Otherwise it's a valid password. Log the user in
                    else {
                        return done(null, user, { message: "Logged in now" });
                    }
                });
            } catch (err) {
                return done(err);
            }
            
        })
    );
    

    // For signup
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true },
        
        function(req, username, password, done){
            process.nextTick(function() {
                Administrator.findOne({ 'username' : username }, function(err, existingUser) {
                    // If the username already exist, then fail
                    if (err){
                        console.log(err);
                        return done(err);
                    }

                    if (existingUser){
                        console.log('User already existed');
                        return done(null, false, { message: "User already exists" });
                    }
                    else {
                        // Otherwise, create an user
                        var newUser = new Administrator();
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);
                        newUser.adminName = req.body.adminName;
                        newUser.customerAssociated = [];

                        // Save the user
                        newUser.save(function(err){
                            if (err){
                                throw(err);
                            }
                            return done(null, newUser);
                        });

                        // req.session.username = username;
                    }
                });
            });
        }
    ));

    // For authenticating the user using the token
    passport.use("user-jwt", new JwtStrategy.Strategy({
        jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.PASSPORT_KEY
    }, (jwt_payload, done) => {
        // Search for the user
        Administrator.findOne({"username": jwt_payload.body._id}, (err, user)  => {
            if (err) {
                console.log("THISSSSSSSSSSSSS")
                return done(err, false);
            }
            // Found the user, pass it over to passport
            if (user) {
                return done(null, user);
            }
            // Authentication failed.
            else {
                return done(null, false)
            }
        })
    }))
}
