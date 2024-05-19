const express = require("express");
const Auth = require("./modules/Auth");
const app = express();
const port = 9001;

app.use(express.json());

// app.use(Auth);
app.get("/", Auth,(req,res)=>{
    console.log(req.Admin)
res.send(`Admin status ${req.Admin }`)
})
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
