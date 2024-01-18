const express = require('express');
const zod = require("zod")
const app = express();


//Method 1 and Mehtod 2 both are ugly ways of doing checks

//Method 1
// app.get('/healthcheckup', (req,res) => {
//     const username = req.headers.username;
//     const password = req.headers.password;
//     const kidneyId = req.query.kidneyId;

//     if( username === "arty" && password === "pass"){
//        if( kidneyId == 1 || kidneyId ==2){

//         res.json({
//             msg: "your Kidney/Kidneys is/are safe",
//         });
//        }
//     }
   
    
    
//     res.status(400).json({
//         "msg" : "Something is wrong with your inputs"
//     })

// });









//Method 2 using early return
// app.get('/', (req,res) => {
     


//     const username = req.headers.username;
//     const password = req.headers.password;
//     const kidneyId = req.query.kidneyId;



//     if(username != "arty" || password != "pass"){
//         res.status(404).json({
//             "msg": "User dosenot exists",
//         })
//     return; 
//     }

//     if(kidneyId !=1 && kidneyId != 2){
//         res.status(406).json({
//             "msg":"Invalid Kidney Id"
//         });
//         return;
//     }

//     res.json({
//                 "msg" : "Your Kidneys are safe"
//             })
// })





//explanation of next() function

// app.get('/', function(req,res,next){
//     console.log("Hi from req1")
//     next();//if the curent function gets executed properly the next() function will transfere the control to the next function
// },
//     function(req,res,next){
//         console.log("Hi from req2")
//         next();
//     }

// )









//Middleware example 1

// function userMiddleware(req,res,next) {

//     const username = req.headers.username;
//     const password = req.headers.password;
    
//     if(username != "arty" || password != "pass"){
//         res.status(403).json({
//             "msg" : "'You are not authorized to view this page'"
//         });
//     }
//     else{
//         next();
//     }
// };


// function kidneyMiddleware(req,res,next){
//     const kidneyId = req.query.kidneyId;
//     if(kidneyId !=1 && kidneyId !=2){
//         res.status(403).json({
//             "msg": "Invalid Kidney Id"
//         })
        
//     }else{
//         next();
//     }
// }

// app.get('/', userMiddleware, kidneyMiddleware, function(req,res){
//     // do something with kidneys here

//     res.send("<h1>your Kideny is healthy</h1>")
// })







//middleware example 2


// app.use(express.json());

// app.post('/',function(req,res) {
//     const kidneys = req.body.kidneys;
//     const kidneyLength = kidneys.length ;
    
//     res.send("you have " + kidneyLength + "Kidneys");
// })

// //global catches
// app.use(function(err,req,res,next){
//     res.json({
//         msg: " Something went wrong with the server "
//     })
// });













//zod


//another zod schema example
const schema = zod.object({
    email: zod.string(),
    password: zod.string(),
    country: zod.literal("IN").or(zod.literal("US")),
    kidneys: zod.array(zod.number)

})

app.use(express.json());
app.post('/', function(req,res){
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys)
    if (!response.success){
        res.status(411).json({
            msg: "input is invalid"
        })
    } else {
        res.send(
            response
        )
    }
    
})

app.listen(3800);