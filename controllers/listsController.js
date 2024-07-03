/*
Created Date: 2021.09.01 by Linhao Ying

Brief Introduction: These backend functions enable the app to complete requirements
related to manage lists.

*/
const mongoose = require("mongoose")

// import customer model
const Lists = mongoose.model("Lists")
const Customer = mongoose.model("Customer")

// get all customers
const getAllLists = async (req, res) => {
  try {
    const lists = await Lists.find()
    return res.send(lists)
  } catch (err) {
    res.status(400)
    return res.send("Database query failed")
  }
}

// add a new list (POST)
const addList = (req, res) => {
    if(!req.body) {
      return res.status(400).send("Customer data is empty")
    }
    console.log(req.body)

    const toAddCustomers = req.body.toAddCustomers
    const cur_date = new Date()
    //new customer
    const newList = new Lists({
      name : req.body.name,
      size : toAddCustomers.length,
      creator : req.body.creator,
      last_updated : cur_date
    })

    newList
      .save()
      .then(() => 
      {for (let i = 0; i < toAddCustomers.length; i++) {
        Customer.updateOne(
          {_id : toAddCustomers[i]},
          {$push : {lists : req.body.name}}
        ).then(data => {
          if(!data) {
            res.status(404).send("Error with customer id")
          }else {
            res.send("no error")
          }
        }).catch(err => {
          res.status(500).send(err)
        })}}
        ).catch(err => {
      res.status(500).send(err)
    })
}

// delete a new list (delete)
const deleteList = async (req, res) => {

  await Customer.updateMany(
    {"lists" : {$in : req.params.name}},
    {$pull : {"lists" : req.params.name}}
  ).then(data => console.log(data))
  .catch(err => console.log(err))

  await Lists.findOneAndRemove({
    name: req.params.name
   }, (err) => {
    if(err) {
     res.send('error removing')
    } else {
     res.status(204);
     res.send({ message: 'Deleted' });
   }
  })
}

const updateList = async (req,res) =>{
  const thing = new Lists({
    _id: req.params.id,
    name: req.body.newName,
  });

  await Customer.updateMany(
      {"lists" : {$in : req.body.oldName}},
      {$set : {"lists" : req.body.newName}}
    ).then(data => console.log(data))
    .catch(err => console.log(err))
  
  await Lists.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

// (GET) Get all customers in a group
const getCustomerByList = async (req, res) => {  
  try {
      const customers = await Customer.find( {"lists" : {$in : req.params.name}} )
      if (customers === null) {   // no customer of the list found in database
          res.status(404)
          return res.send("Customers not found")
      }
      return res.send(customers)
  } catch (err) {     // error occurred
      res.status(400)
      console.log(err)
      return res.send("Database query failed")
  }
}


// update customers list(add) (PUT)
const addCustomerToList = (req, res) => {
  if(!req.body) {
    return res.status(400).send("Customer data is empty")
  }

  const toAddCustomers = req.body.toAddCustomers;

  for (let i = 0; i < toAddCustomers.length; i++) {
    Customer.updateOne(
      {_id : toAddCustomers[i]},
      {$push : {lists : req.body.name}}
    ).then(data => {
      if(!data) {
        res.status(404).send("Error with customer id")
      }else {
        Lists.updateOne(
          {name : req.body.name},
          {$inc : {size : 1}}
        ).then(data => {
          if(!data) {
            res.status(404).send("Error with customer id")
          }else {
            res.send(data)
          }
        })
      }
    }).catch(err => {
      res.status(500).send(err)
    })
  }
}
// update customers list(remove) (PUT)
// update customers list(add) (PUT)
const removeCustomerFromList = (req, res) => {
  if(!req.body) {
    return res.status(400).send("Customer data is empty")
  }

  const toDeleteCustomers = req.body.toDeleteCustomers;

  for (let i = 0; i < toDeleteCustomers.length; i++) {
    Customer.updateOne(
      {_id : toDeleteCustomers[i]},
      {$pull : {lists : req.body.name}}
    ).then(data => {
      if(!data) {
        res.status(404).send("Error with customer id")
      }else {
        Lists.updateOne(
          {name : req.body.name},
          {$inc : {size : -1}}
        ).then(data => {
          if(!data) {
            res.status(404).send("Error with customer id")
          }else {
            res.send(data)
          }
        })
      }
    }).catch(err => {
      res.status(500).send(err)
    })
  }
}

// remember to export the functions
module.exports = {
  addList, getAllLists, deleteList, updateList, addCustomerToList, removeCustomerFromList, getCustomerByList
}