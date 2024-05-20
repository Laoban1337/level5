const express = require("express");

const app = express();
app.use(express.json());
const port = 9040;




app.use("/bounties", require("./routes/bountyRoute.js"))


app.listen(port, () => {
  console.log(`listening on ${port}`);
});
