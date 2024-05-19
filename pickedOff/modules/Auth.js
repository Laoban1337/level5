const Auth = (req, res, next) => {
  if (req.query.Admin === "true") {
    console.log("Admin");
    req.Admin = true
    next();
  } else if (!req.query.Admin) {
    res.send({ greeting: "Welcome user" });
  } else {
    res.status(403).send({ error: "Forbidden" });
  }
};
module.exports = Auth;
