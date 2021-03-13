const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    UserName:String,
    UserEmail:String,
    UserPassword:String,
    UserState: String,
    UserCity: String,
    UserArea: String,
});

module.exports = mongoose.model('user',userSchema);