const express = require('express')
const passport = require ('passport')

// add our router 
const emailRouter = express.Router()

const emailController = require('../controllers/emailController.js')

emailRouter.post('/', passport.authenticate("user-jwt", {session: false}), emailController.sendEMail)

module.exports = emailRouter