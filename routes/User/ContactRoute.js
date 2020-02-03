let express = require("express");
let router = express.Router();
let cd = require("../../mongodb/Contact");

router.post("/contactus", async (req, res) => {
  let { error } = cd.contactvalidation(req.body);
  if (error) {
    return res.status(402).send(error.details[0].message);
  }
  let newcontact = new cd.contactModel({
    email: req.body.email,
    message: req.body.message
  });
  let contacsave = await newcontact.save();
  res.send({ Message: "Contact Details Send!!!!!", Details: contacsave });
});

module.exports = router;
