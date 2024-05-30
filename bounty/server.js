const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.Port;

//middleware
app.use(express.json());
app.use(morgan("dev"));
//Db Connection
mongoose.connect(
  process.env.DbConnect,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log(`You are connected to the db`)
); 
//route
app.use("/bounties", require("./routes/bountyRouter.js"));

//error handling
app.use((err,req,res,next)=>{
  console.log(err)
  res.status(500).send({errMsg:err.message})
})

//server listener
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
