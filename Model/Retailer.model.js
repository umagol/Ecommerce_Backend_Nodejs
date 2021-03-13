const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema({
    RetailerName:String,
    RetailerEmail:String,
    RetailerPassword:String,
    RetailerState: String,
    RetailerCity: String,
    RetailerDate: Date,
    RetailerArea: String,
    RetailerProduct: Object,
    RetailerOrder:Object,
    RetailerPayment:Object 
});

module.exports = mongoose.model('retailer',retailerSchema);