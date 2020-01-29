let jwt = require("jsonwebtoken");
let config = require("config");

function checklogin(req, res, next) {
  let token = req.header("secure-token");
  if (!token) {
    return res.status(402).send({ Message: "Please login again" });
  }
  try {
    let decodedToken = jwt.verify(token, config.get("jwtprivatekey"));
    req.UserRegistration = decodedToken;
    next();
  } catch (ex) {
    res.status(402).send("Unauthorised user!!!!");
  }
}
module.exports = checklogin;
