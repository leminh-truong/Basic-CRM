const express = require('express')
const passport = require('passport')

//const utilities = require('./utility')

// add our router 
const customerRouter = express.Router()

// add the author controller
const customerController = require('../controllers/customerController.js')

// handle the GET request to get all authors
customerRouter.get('/', passport.authenticate("user-jwt", {session: false}), customerController.getAllCustomers)

// handle the GET request to get one author
customerRouter.get('/:_id', passport.authenticate("user-jwt", {session: false}), customerController.getOneCustomer)

// handle the GET request to get customer by admin
customerRouter.get('/byadmin/:admin', passport.authenticate("user-jwt", {session: false}), customerController.getCustomerByAdmin)

customerRouter.get('/assignadmin/unassigned', passport.authenticate("user-jwt", {session: false}), customerController.getUnassignedCustomers)

// handle the GET request to get customer by email
customerRouter.get('/byemail/:email', customerController.getCustomerByEmail)

//handle the PUT request to update customer visitted count
customerRouter.put('/visittedcount/:email', customerController.updateVisCount)

// handle POST requests to add one author
customerRouter.post('/' , customerController.addCustomer)

// Handle request to assign an admin to a customer
customerRouter.post('/assignadmin/:_id/:admin', passport.authenticate("user-jwt", {session: false}), customerController.assignAdmin)

// handle request to delete a customer
customerRouter.post('/delCust/:_id', passport.authenticate("user-jwt", {session: false}), customerController.deleteOneCustomer)

// update customer details
customerRouter.put('/updatedetails/:_id/:phone/:admin/:company', passport.authenticate("user-jwt", {session: false}), customerController.updateCustomerDetails)

// export the router
module.exports = customerRouter