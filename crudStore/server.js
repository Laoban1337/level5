const express = require("express")
const mongoose = require('mongoose');
const morgan = require("morgan")
require('dotenv').config()
const app = express()
const port = process.env.Port


//middleWare
app.use(express.json())
app.use(morgan("dev"))

//
//connect to DB
async function ConnectToDb(){
     mongoose.connect(process.env.DbConnection,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    }, ()=> console.log("connected to db hopefully"));
    
}
ConnectToDb();
//routes

app.use("/items",require("./routes/inventory.js"))

//Error handling
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send({ errMsg: err.message });
})

//Server listener
app.listen(port,()=>{
    console.log(`Server is running on <<<<${port}>>>>`)
})