const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    ProductName: String,
    OrderDate: Date,
    RetailerName: String,
    RetailerArea: String,
    UserName: String,
    UserArea: String,
    ProductPrice: Number,
    ProductCategory:String,
    ProductOrderNo: Number,
    PaymentType:{
        type:String
    },
    OrderStatus:{
        type:String
    }
});

module.exports = mongoose.model('order',orderSchema);