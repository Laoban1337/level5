const express = require("express");
const app = express();

const port = 9000;

app.use(express.json());

app.use("/movies", require("./routes/movieRouter.js"));
app.use("/tvShows", require("./routes/tvRouter.js"));
app.get("/", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(` movie server running on ${port}
  `);
});
