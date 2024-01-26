const express = require("express");
const app = express();

function ticketChecker(req,res,next) {
    const age = req.query.age;
    if(age >= 14){
        next();
    }else{
        res.status(403).send({error: 'Ticket not valid'});
    }
}


//using middleware in every endpoint
//app.use(ticketChecker);
//app.use only triggers the endpoints below the app.use() i.e. if it is added after /ride1 endpoint then it wont be working for ride1

app.get('/ride1', ticketChecker,(req,res) => {
    res.send("You rode the first ride successfully");
})

app.get('/ride2', ticketChecker,(req,res) => {
    res.send("You rode the second ride successfully");
})


app.listen(7000);
