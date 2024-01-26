const express = require("express");
const app = express();

let reqCount= 0;

app.use(function (req,res,next) {
    reqCount++;
    console.log(reqCount)
    next();
});


app.get('/ride1', (req,res) => {
    res.send("You rode the first ride successfully");
    
})

app.get('/ride2', (req,res) => {
    res.send("You rode the second ride successfully");
})


app.listen(7000);
