const express= require('express');

const app = express();
let errCount= 0;





app.get('/user', function(req,res){
    throw new Error("user not found");
    res.status(200).json({name: 'john'});
})

app.post('/user', function(req,res){
    res.status(200).json({
        msg: "Created dummy user"
    })
})

app.get('/errorCount', function(req,res){
    res.status(200).json({errCount});
})


//error handling middleware
app.use(function(err,req,res,next){
    res.status(404).send({})
    errCount++;
    console.log(errCount)
})


app.listen(7000);




























