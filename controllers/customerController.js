/*
Created Date: 2021.09.01 by Linhao Ying

Brief Introduction: These backend function enables the app to complete requirements
related to manage customers.

*/
const mongoose = require("mongoose")

// import customer model
const Customer = mongoose.model("Customer")
const Lists = mongoose.model("Lists")

// get all customers
const getAllCustomers = async (req, res) => {
  try {
    //console.log(req);
    const customers = await Customer.find()
    return res.send(customers)
  } catch (err) {
    res.status(400)
    return res.send("Database query failed")
  }
}

// find one customer by their id
const getOneCustomer = async (req, res) => {  
    try {
        const oneCustomer = await Customer.findOne( {"_id": req.params._id} )
        if (oneCustomer === null) {   // no author found in database
            res.status(404)
            return res.send("Customer not found")
        }
        return res.send(oneCustomer)  // author was found
    } catch (err) {     // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}

// (GET) Get all customers with the same admin
const getCustomerByAdmin = async (req, res) => {
  try {
    const customers = await Customer.find( {"administrator" : req.params.admin} )
    if (customers === null) {   // this admin was not found in database
        res.status(404)
        return res.send("Admin not found")
    }
    return res.send(customers)  // Customers by admin was found
} catch (err) {     // error occurred
    res.status(400)
    console.log(err)
    return res.send("Database query failed")
}
}

const getUnassignedCustomers = async (req, res) => {
  try {
    //console.log(req);
    const customers = await Customer.find( {"administrator" : ""})
    return res.send(customers)
  } catch (err) {
    res.status(400)
    return res.send("Database query failed")
  }
}

// (GET) Get one customer by email
const getCustomerByEmail = async (req, res) => {
  try {
    const customer = await Customer.findOne( {"email" : req.params.email} )
    if (customer === null) {   // this email was not found in database
        res.status(404)
        return res.send("Customer not found")
    }
    res.status(200)
    return res.send(customer)  // Customers by admin was found
  } catch (err) {     // error occurred
      res.status(400)
      console.log(err)
      return res.send("Database query failed")
  }
}

// (PUT) update customer visitted count (average page view(APV) and average website view(AWV) in this case)
// find customer via email and update their APV and AWV by 1, also update the most recent visit date
const updateVisCount = async (req, res) => {
  const cur_date = new Date()
  if(!req.body) {
    return res.status(400).send("Customer email is empty")
  }
  try {
    Customer.updateOne({"email": req.params.email}, {$inc : {APV:1 , AWV:1}, $set : {most_recent_visit : cur_date}})
    .then(data => {
      if (!data) {
        res.status(404).send("Error with customer email")
      } else {
        res.send(data)
      }
    })
  } catch (err) {     // error occurred
      res.status(400)
      console.log(err)
      return res.send("Database query failed")
  }
}

// Assign an admin to a customer (POST)
const assignAdmin = async (req, res) => {
  try {
      await Customer.updateOne( {"_id": req.params._id}, 
                                { $set: {administrator : req.params.admin} }
                              )
      console.log("Changed " + req.params._id + "'s admin to " + req.params.admin);
      return res.send("Changed " + req.params._id + "'s admin to " + req.params.admin);
  }
  catch (err){
    res.status(400)
      console.log(err)
      return res.send("Database query failed")
  }
}

// add customer (POST)
const addCustomer = (req, res) => {
  if(!req.body) {
    return res.status(400).send("Customer data is empty")
  }
  console.log(req.body)

  const cur_date = new Date()
  //new customer
  const newCustomer = new Customer({
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    company : req.body.company,
    email : req.body.email,
    administrator: "",
    phone_number: req.body.phone_number,
    create_date : cur_date,
    last_contacted : cur_date,
    APV : req.body.APV,
    AWV : req.body.AWV,
    first_visit : cur_date,
    most_recent_visit : cur_date,
    lists : req.body.lists
  })

  console.log(newCustomer)

  newCustomer
    .save()
    .then(data => {
      res.send(data)
  }).catch(err => {
    res.status(500).send(err)
  })

}

// delete a customer
const deleteOneCustomer = async (req, res) => {
  try {
      const customer = await Customer.findOne({"_id": req.params._id})
      for (let i = 0; i < customer.lists.length; i++) {
        await Lists.updateOne(
          {name : customer.lists[i]},
          {$inc : {size : -1}}
        )}
        await Customer.deleteOne( {"_id": req.params._id})
        return res.send("success");
      
  }
  catch (err){
    res.status(400)
      console.log(err)
      return res.send("Database query failed")
  }
}

// update customer details
const updateCustomerDetails = async (req, res) => {
  try {
    await Customer.updateOne( {"_id": req.params._id}, 
    {$set: {
      phone_number: req.params.phone,
      administrator: req.params.admin,
      company:req.params.company
    }})
}
  catch (err){
    res.status(400)
      console.log(err)
      return res.send("Database query failed")
  }
}

// remember to export the functions
module.exports = {
  getAllCustomers, getOneCustomer, addCustomer, assignAdmin, getCustomerByAdmin, 
  deleteOneCustomer, getCustomerByEmail, updateVisCount, updateCustomerDetails,getUnassignedCustomers
}
