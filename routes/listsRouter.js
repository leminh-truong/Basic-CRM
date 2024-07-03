const express = require('express')
const passport = require('passport')

// add our router 
const listsRouter = express.Router()

// add the author controller
const listsController = require('../controllers/listsController.js')

// handle the GET request to get all authors
listsRouter.get('/', passport.authenticate("user-jwt", {session: false}), listsController.getAllLists)

// handle POST request to add new list
listsRouter.post('/' , passport.authenticate("user-jwt", {session: false}), listsController.addList)

// handle PUT update list name
listsRouter.put('/:id' ,passport.authenticate("user-jwt", {session: false}), listsController.updateList)

// handle DELETE to delete list
listsRouter.delete('/:name' ,passport.authenticate("user-jwt", {session: false}), listsController.deleteList)

// handle the GET request to get customer by list
listsRouter.get('/:name', passport.authenticate("user-jwt", {session: false}), listsController.getCustomerByList)

// handle PUT requests to add customer to lists
listsRouter.post('/addtolist/', passport.authenticate("user-jwt", {session: false}), listsController.addCustomerToList)

// handle PUT requests to remove customer from lists
listsRouter.post('/removefromlist/', passport.authenticate("user-jwt", {session: false}), listsController.removeCustomerFromList)

// export the router
module.exports = listsRouter