const express = require("express");
const app = express();
const port = 7000;

app.use("/inventory", require("./routes/inventoryRoute.js"));

app.listen(port, () => {
  console.log(`server is running on ${port}!`);
});
