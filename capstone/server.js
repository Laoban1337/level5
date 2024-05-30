const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const port = 7090;

//middleware
app.use(express.json());
app.use(morgan("dev"));

//connect to Database
mongoose.connect(
  process.env.DbConnector,

  () => console.log(`You are connected to the database`)
);

//routes

app.use("/cleaners", require("./routes/cleanerRouter.js"));
app.use("/chore", require("./routes/choreRouter.js"));

//error handling
app.use((err, req, res,next) => {
  console.log(err);
  res.status(500).send({ errMsg: err.message });
});

//server listener
app.listen(port, () => {
  console.log(`server is running on << <${port}> >>`);
});
