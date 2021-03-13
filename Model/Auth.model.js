const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({    
    Name:String,
    Email:String,
    Password:String,
    AccountType:String
});

module.exports = mongoose.model('auth',authSchema);