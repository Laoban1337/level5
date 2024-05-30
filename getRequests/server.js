const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const port = process.env.PORT || 9000;
require("dotenv").config();

app.use(express.json());
app.use(morgan("dev"));
//connect to Database

mongoose.connect(
  process.env.DbConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log(`You are connected to the db`)
);

//routes

app.use("/movies", require("./routes/movieRouter.js"));
app.use("/tvShows", require("./routes/tvRouter.js"));

// app.get("/", (req, res) => {
//   res.send(req.body);
// });

//Error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.send({ errorMsg: err.message });
});

//server listener
app.listen(port, () => {
  console.log(` movie server running on ${port}
  `);
});
