const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
 first_name: String,
 last_name: String,
 company: String,
 administrator: String,
//  email: String,
 email : {
    type: String,
    required: true,
    unique: true
   },
 phone_number: Number,
 create_date : Date,
 last_contacted : Date,
 APV : Number,
 AWV : Number,
 first_visit : Date,
 most_recent_visit : Date,
 lists : [String]
})
const Customer = mongoose.model("Customer", customerSchema)
module.exports = Customer