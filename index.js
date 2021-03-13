/**
 * @author: Satish Umagol
 * @template: Node JS(Backend)
 * @Date : 23/01/2021
 */
// Export Module
const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Route/User.route');
const Auth = require('./Route/Auth.route');
const Product = require('./Route/Product.route');
const Retailer = require('./Route/Retailer.route');


//Dotenv config
dotenv.config();

//MongoDB Connection
mongoose.connect(
    process.env.DB_CONNECTION,
    {   
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false 
    },
    ()=>console.log('DB is Connect')
);



// Middleware
app.use(express.json());
app.use(cors());




// Route
app.use("/api/user", User);
// app.use("/api/admin", Admin);
app.use("/api/auth", Auth);
app.use("/api/product",Product);
app.use("/api/retailer",Retailer);



app.listen(8080,()=>console.log("Server is runing on 5000 port"));


