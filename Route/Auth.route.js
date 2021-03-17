const route = require("express").Router();
const bcrypt = require("bcryptjs");
const Auth = require("../Model/Auth.model");
const User = require("../Model/User.model");
const Admin =require("../Model/Admin.model");
const Retailer =require("../Model/Retailer.model");
const jwt = require("jsonwebtoken");
const UserLog = require("../Model/Logs/User.Log");


route.post("/login", async (req, res) => {

    // checking user email id and Psaaword in database
    const user = await Auth.findOne({ Email: req.body.email });

    //if it is not exit send error
    if (!user) {
        return res.status(200).send({ error : "Email Invalid"});
    }

    //Encrypt Password and check
    const validPass = await bcrypt.compare(req.body.password, user.Password);

    if (!validPass) {
        return res.status(200).send({ error : "Password Invalid"});
    } else {
        // creat and assign a token
        if(user.AccountType == "user"){
            const token = jwt.sign({ Email: user.Email }, process.env.TOKEN_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN, // Set Time For access token
                });
            
            //send token in userid 
            res.header("auth-token", token).status(201).send({ usertoken: token});
        }  
        else
        if(user.AccountType == "retailer")
        {
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN, // Set Time For access token
                });
            //send token in userid 
            res.header("auth-token", token).status(201).send({ retailertoken: token});
        }
    }
});

//User SignUp Route
route.post("/signup/user", async (req, res) => {

    var d = new Date();
    // checking user email id in database
    const emailExit = await Auth.findOne({
        Email: req.body.email
    });
    //check email is exit or not
    if (emailExit) {
        return res.status(200).send({ eror : "Email is Invalid"});
        
    }
    //email is not exit so fill the data in db 

    // hash password  encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = new User({
        //requist . bodypaser . filedname by pass data in frontend or postman
        UserName: req.body.name,
        UserEmail: req.body.email,
        UserPassword: hashedPassword,
        UserState: req.body.state,
        UserCity: req.body.city,
        UserArea: req.body.area,
    });

    const userLog = new UserLog({
        UserName:  req.body.name,
        UserEmail: req.body.email,
        UserSignupDate: d,
        UserState: req.body.state,
        UserCity: req.body.city,
        UserArea: req.body.area,
    })


    const auth = new Auth({
        Name:req.body.name,
        Email: req.body.email,
        Password:hashedPassword,
        AccountType:"user",
    });

    //try save the data is db and carch any error
    try {
        const savedata = await auth.save();
        const savedUser = await user.save();
        await userLog.save();
        res.status(201).send(savedUser); //status 201 for user post method and 200 use for get method 
    } catch (error) {
        res.status(400).send(error); //status 400 user for any error
            
    }

});


route.post("/signup/retailer", async (req, res) => {

    // checking user email id in database
    const emailExit = await Auth.findOne({
        Email: req.body.email
    });
    //check email is exit or not
    if (emailExit) {
        return res.status(200).send({ error : "Email is Invalid"});
        
    }    
    //email is not exit so fill the data in db 

    // hash password  encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const retailerDB = new Retailer({
        //requist . bodypaser . filedname by pass data in frontend or postman
        RetailerName: req.body.name,
        RetailerEmail: req.body.email,
        RetaileraArea:req.body.area,
        RetailerPassword: hashedPassword,
        RetailerDate: new Date(),
        RetaileraCity:req.body.city,
        RetaileraState:req.body.state,
    });

    const AuthDB = new Auth({
        Name:req.body.name,
        Email: req.body.email,
        Password:hashedPassword,
        AccountType:"retailer",
    });

    //try save the data is db and carch any error
    try {
        const savedata = await AuthDB.save();
        const savedUser = await retailerDB.save();
        res.status(201).send(savedUser); //status 201 for user post method and 200 use for get method 
    } catch (error) {
        res.status(400).send(error); //status 400 user for any error
    }

});

module.exports = route;