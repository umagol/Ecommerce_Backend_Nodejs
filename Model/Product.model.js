const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    ProductName: String,
    ProductaddedDate: Date,
    ProductDescription: String,
    ProductPrice: Number,
    Productcategory:String,
    ProductOrderNo: Number,
    RetailerName:String,
});

module.exports = mongoose.model('product',productSchema);