const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema({
    RetailerName:String,
    RetailerEmail:String,
    RetailerPassword:String,
    RetailerState: String,
    RetailerCity: String,
    RetailerDate: Date,
    RetailerArea: String,
    RetailerPayment:Object, 
});

module.exports = mongoose.model('retailer',retailerSchema);