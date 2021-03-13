const mongoose = require("mongoose");

const userLogSchema = new mongoose.Schema({
    UserName: String,
    UserEmail: String,
    UserSignupDate: Date,
    UserState: String,
    UserCity: String,
    UserArea: String,
    Log:{
        type:Object
    },
    Order:{
        type: Object
    }
});

module.exports = mongoose.model('userLog',userLogSchema);