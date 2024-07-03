const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")
const listsSchema = new mongoose.Schema({
 name : {
     type: String,
     required: true,
     unique: true
    },
 size : Number,
 creator : String,
 last_updated : Date
})
listsSchema.plugin(uniqueValidator)
const Lists = mongoose.model("Lists", listsSchema)
module.exports = Lists