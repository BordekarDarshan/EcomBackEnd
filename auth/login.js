let express = require("express");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let urm = require("../mongodb/UserRegistration");
let joi = require("@hapi/joi");
let router = express.Router();

router.post("/login", async (req, res) => {
  let afterEntryEmail = await urm.uRegisModel.findOne({
    "userlogin.emailId": req.body.userloginSignIn.emailIdSignIn
  });
  if (!afterEntryEmail) {
    res.send({ Message: "Invalid EmailId" });
  }
  let passMatch = await bcrypt.compare(
    req.body.userloginSignIn.passwordSignIn,
    afterEntryEmail.userlogin.password
  );
  if (!passMatch) {
    return res.send({ Message: "Invalid Password" });
  }
  let token = afterEntryEmail.tokenValidation();

  res.header("secure-token", token).send({ Message: "Login Successful" });
});

module.exports = router;
