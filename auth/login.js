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

  res
    .header("secure-token", token)
    .send({ Message: "Login Successful", Token: token, Data: afterEntryEmail });
});

router.get("/currentUser", async (req, res) => {
  try {
    let current = await urm.uRegisModel.findById(req.UserRegistration._id);
    res.send(current);
  } catch (error) {
    res.send(ex.message);
  }
});

module.exports = router;
