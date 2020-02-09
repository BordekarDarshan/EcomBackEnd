let express = require("express");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let urm = require("../mongodb/UserRegistration");
let joi = require("@hapi/joi");
let router = express.Router();

router.post("/login", async (req, res) => {
  let afterEntryEmail = await urm.uRegisModel.findOne({
    "userlogin.emailId": req.body.userlogin.emailId
  });
  if (!afterEntryEmail) {
    res.status(402).send("Invalid EmailId");
  }
  let passMatch = await bcrypt.compare(
    req.body.userlogin.password,
    afterEntryEmail.userlogin.password
  );
  if (!passMatch) {
    return res.status(402).send("Invalid Password");
  }
  let token = afterEntryEmail.tokenValidation();

  res.header("secure-token", token).send({ Message: "Login Successful" });
});

module.exports = router;
