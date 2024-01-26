const mongoose = require("mongoose");
const express = require("express");



const app = express();
app.use(express.json())

//connecting to mongodb 
mongoose.connect("mongodb+srv://admin:VyTRUZ8Cw8G2RksO@cluster01.5prrfis.mongodb.net/userappnew");


const User = mongoose.model('Users', 
    { name: String, 
      email: String, 
      password: String}
);

app.post("/signup", async function(req,res){
    const name = req.response.username;
    const email = req.response.email;
    const password = req.response.password;



    //checking if a user exists with same credentials
    const existingUser =  await User.findOne({ email: email});
    if(existingUser) {
        return res.status(400).send(" User already exists");
    }



    const user = new User({
        name: name,
        email: email,
        password: password,
    });
    

    user.save();
    res.json({
        "msg": "New user created successfully"
    })

})


app.listen(4000)



























































































