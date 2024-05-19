const express = require("express");
const app = express();
const port = 9000;

app.get("/", (req, res) => {
  res.send({ name: "Brian", age: 40 });
});

app.get("/user", (req, res) => {
  res.send({ name: "Admin", control: "global" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
