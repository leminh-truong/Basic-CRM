/*
Created Date: 2021.09.20 by Tung Lam Nguyen
Modified on: 2021.09.22 by Le Minh Truong - Add pasport strategies for administrator registration and authentication
This file defines the backend routes of administrator registration and authentication

*/
const mongoose = require("mongoose")
const passport = require("passport"), LocalStrategy = require("passport-local").Strategy, JwtStrategy = require("passport-jwt");
require('dotenv').config()
// import customer model
const Administrator = mongoose.model("Administrator")

// add admin (POST)
const addAdmin = (req, res) => {
    if(!req.body) {
      return res.status(400).send("Admin data is empty")
    }
    //console.log(req.body)
  
    //new admin
    const newAdmin = new Administrator({
      username : req.body.username,
      password : req.body.password,
      adminName : req.body.adminName,
      customerAssociated : []
    })
  
    console.log(newAdmin)
  
    newAdmin
      .save()
      .then(data => {
        res.send(data)
    }).catch(err => {
      res.status(500).send(err)
    })
  
  }


passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
// function(req, username, password, done) {
  async function(username, password, done) {
      try {
          // Find the user then only return the user and password
          Administrator.findOne({username: username}, 'username password', async function (err, user) {
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

// get all admins' names
const getAllAdmins = async (req, res) => {
    var adminNames = [];
    try {
      //console.log(req);
      const admins = await Administrator.find()
      admins.forEach(admin => {
          adminNames.push(admin['username']);
      })
      return res.send(adminNames)
    } catch (err) {
      res.status(400)
      return res.send("Database query failed")
    }
  }
module.exports = {addAdmin, getAllAdmins}