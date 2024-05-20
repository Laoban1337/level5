const express = require("express");
const app = express();
const port = 8070;

app.use(express.json());

app.use("/todos", require("./routes/todoRouter.js"));

app.listen(port, () => {
  console.log(`Server is running on ${port}!`);
});
