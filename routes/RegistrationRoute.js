let express = require("express");
let bcrypt = require("bcryptjs");
let urm = require("../mongodb/UserRegistration");
let router = express.Router();
let auth = require("../middleware/authorization");
let admin = require("../middleware/admin");

router.post("/newuser", async (req, res) => {
  let { error } = urm.uRegisvalidation(req.body);
  if (error) {
    res.status(402).send(error.details[0].message);
  }
  let useremail = await urm.uRegisModel.findOne({
    "userlogin.emailId": req.body.userlogin.emailId
  });

  if (useremail) {
    return res.status(402).send("Email already exist!!!");
  }
  let newUser = await new urm.uRegisModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    userlogin: req.body.userlogin,
    termsPasswordCheck: req.body.termsPasswordCheck,
    recordDate: Date.now()
  });

  if (!newUser.termsPasswordCheck) {
    return res
      .status(402)
      .send("Please Accept Our Policy... Otherwise you cannot proceed further");
  }
  let salt = await bcrypt.genSalt(10);
  newUser.userlogin.password = await bcrypt.hash(
    newUser.userlogin.password,
    salt
  );

  let saveData = await newUser.save();
  res.send({ Message: "registered successfully" });
});

router.delete("/removeu/:id", [auth, admin], async (req, res) => {
  let data = await urm.uRegisModel.findByIdAndRemove(req.params.id);
  if (!data) {
    res
      .status(402)
      .send("Something went worg... The User's detail hasn't been deleted ");
  }
  res.send({ message: "Details successfully Removed" });
});

module.exports = router;
