const route = require("express").Router();
const verify = require("../Middleware/verify_token");
const Product = require("../Model/Product.model");
const Retailer = require("../Model/Product.model");



route.put('/addproduct', verify,async ( )=>{
    //update retailer prodct list
})






module.exports = route;