/*
Created Date: 2021.Sep.27 by Tung Lam Nguyen
Modified on:
Brief Introduction: The schema for administrator objects
*/

const mongoose = require("mongoose");
const bcrypt = require ('bcrypt');

const administratorSchema = new mongoose.Schema({
 username: {type: String, required: true, unique: true},
 password: {type: String, required: true},
 adminName: String,
 customerAssociated: [{type: mongoose.Schema.Types.ObjectId, ref: "Customer"}]
})

// Method for generating a hash, used for password hashing
administratorSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Checks if password is valid
administratorSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

const Administrator = mongoose.model("Administrator", administratorSchema)
module.exports = Administrator