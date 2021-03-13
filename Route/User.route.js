//Export
const route = require("express").Router();
const verify = require("../Middleware/verify_token");
const User = require("../Model/User.model");
const Auth = require("../Model/Auth.model");

route.get( "/", verify, async(req, res) => {
    try {
        const allUser = await User.find();
        //find() use for finding data in db and findOne() are use fine single data 
        res.status(200).json(allUser);
    }
    catch (error) {
        res.status(400).json({ message: error });//catch Error
    }
});

route.get( "/singaluser/:Email", verify, async(req, res) => {
    try {
        const oneUser = await User.findOne({UserEmail: req.params.Email} ); //Id is pass by url
        res.json({
            Email: oneUser.UserEmail,
            Area: oneUser.UserArea,
            Name: oneUser.UserName
        });
    } catch (error) {
        res.json({ message: error });
    }
}); 

route.delete("/delete/:Email", verify, async(req, res) => {
try {
    const DeleteUser = await User.findOneAndDelete({UserEmail:req.params.Email});
    const DeleteAuth = await Auth.findOneAndDelete({Email:req.params.Email});
    res.send(DeleteUser);    
} catch (error) {
   console.log(error); 
}
});

route.put( "/update/:Email", verify, async (req, res) => {
    var id = req.params.lilistingid;
    var Data = {UserName: req.body.name, UserEmail: req.body.email, UserAbout: req.body.about};
    console.log(Data);
    try {
    const update = User.findOneAndUpdate({UserEmail:req.body.email}, Data, null,  function (err, docs) { 
        if (err){ 
            console.log(err) 
        } });
    res.status(201).send({message: "Data is Updated "})
} catch (error) {
        console.log(error);
    }
});

module.exports = route;
