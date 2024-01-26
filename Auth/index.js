const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456"; 


const app = express();
app.use(express.json())


const ALL_USERS = [
    {
        username: 'prathmesh2001@yahoo.in',
        password: 'password',
        name: 'prathamesh'
    },
    {
        username: 'johnnybravo97@gmail.com',
        password: 'secret',
        name: 'Johnny Bravo'
    },
    {
        username: 'priya@gmail.com',
        password: 'Priya#123',
        name: "priya"
    }
];

function userExists(username,password){
    //write logic to return true or false if this user exists
    //in ALL_USERS array
    let userExists =  false;
    for(let i = 0;i<ALL_USERS.length;i++){
        if(ALL_USERS[i].username == username && ALL_USERS[i].password == password){
            userExists=true;
        }
    }
    return userExists;

}
    

app.post('/signin', function(req,res){

    const username = req.body.username;
    const password = req.body.password;



    if(!userExists(username,password)){
        return res.status(403).json({
            "msg" : "User doesnt exists"
        });
    }

    var token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token,
    });

});


app.get('/users', function(req,res){
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,jwtPassword);
    const username = decoded.username;
        //return a list of users other than this username
     
        res.json({
            users: ALL_USERS.filter(function(value){
                if(value.username == username){
                    return false;
                }
                else{
                    return true;
                }
            })
        });
    });


app.listen(4000);














