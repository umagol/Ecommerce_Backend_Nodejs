const route = require("express").Router();
const verify = require("../Middleware/verify_token");
const Product = require("../Model/Product.model");
const Auth = require("../Model/Auth.model");
const Order = require("../Model/Order.model");
const User = require("../Model/User.model");
const { findOne } = require("../Model/Product.model");

//Add Product 
route.post('/addproduct', verify, async (req,res)=>{

    //check Product is alredy exist or not
    const productisexist = await Product.findOne({
        ProductName: req.body.name
    });
    if (productisexist) {
        return res.status(200).send({ eror : "Product is alredy in DB"});   
    }

    const product = new Product({
        ProductName: req.body.name,
        ProductaddedDate: new Date(),
        ProductDescription: req.body.description,
        ProductPrice: req.body.price,
        Productcategory:req.body.category,
        ProductOrderNo: 0, 
    });
    try {
        const savedProduct = await product.save();
        res.status(201).send(savedProduct);  
    } catch (error) {
        res.status(400).send(error); //status 400 user for any error
    }
});


// Get Single Product
route.get('/singalproduct/:name', verify, async(req, res) => {
    const Name = req.params.name;
    let productName = await Product.findOne({
        ProductName: Name
    });
    if(!productName){
        res.status(400).send({message:"Product is not found"});
    }
    try {
        res.status(200).send(productName);
    } catch (error) {
        res.status(400).send({message:"Error is here"});
    }
});


//Search Product
route.get('/searchproduct/:name', verify, async (req, res) => {
    const Name = req.params.name;
    let productName = await Product.find({
        ProductName: Name
    });
    res.send(productName);
});


//Delete Product
route.delete('/deleteproduct/:name', verify, async (req, res) => {
    try {
        const DeleteProduct = await Product.findOneAndDelete({ProductName:req.params.name});
        if(DeleteProduct == null){
            res.status(400).send({message:"Product is Not Found"});
        }
        res.send(DeleteProduct);    
    } catch (error) {
       console.log(error); 
    }
});




//Update Product
route.put('/updateproduct/:name', verify, async (req, res) => {
    
    let productName = await Product.findOne({
        ProductName: req.params.name
    });
    if(!productName){
        res.status(400).send({message:"Product is not found"});
    }

    var Data = {
        ProductName: req.body.name,
        ProductDescription: req.body.description,
        ProductPrice: req.body.price,
        Productcategory:req.body.category,
    }

    try {

    const update = await Product.findOneAndUpdate({ProductName: req.params.name}, Data, null,  function (err, docs) { 
        if (err){ 
            console.log(err) 
        } });
    res.status(201).send({message:"UPdate data", updatedata: update})
} catch (error) {
        console.log(error);
    }
})


//Get Product with Category
route.get('/categoryproduct/:category', verify, async (req, res ) => {

   let ProductName = await Product.find({Productcategory: req.params.category});
    console.log(ProductName);
    if(!ProductName){
        res.status(400).send({message: "category Not Found"});
    }
    try {
        res.status(200).send(ProductName);        
    } catch (error) {
        console.log(error);
    }
});


//Order Product
//Notes : Find retailer have one field product check that filed  search user are near (area) then city then state retaile then check ther 
route.post('/order', verify, async (req, res) => {


    const FindProduct = await User.findOne({ProductName :req.body.ProductName});
    const FindUser = await User.findOne({UserEmail :req.body.UserEmail});
    
    console.log(FindUser);

    const Order = new Order({
        ProductName: req.body.ProductName,
        OrderDate: new Date(),
        RetailerName: String,
        RetailerArea: String,
        UserName: req.body.UserEmail,
        UserArea: String,
        ProductPrice: Number,
        ProductCategory:String,
        ProductOrderNo: Number,
        PaymentType: req.body.PaymentType
    });
    

});


module.exports = route;