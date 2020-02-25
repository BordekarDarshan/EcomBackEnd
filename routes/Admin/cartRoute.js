let express = require("express");
let router = express.Router();
let cm = require("../../mongodb/UserCart");

//Cart Associated With User(Email)
router.post("/cartbyuser", async (req, res) => {
  let uCart = await new cm.userCartModel({
    emailId: req.body.emailId,
    cartItem: req.body.cartItem,
    recordDate: Date.now()
  });
  let datasave = await uCart.save();

  res.send({ Message: "Products added To Respective Email", Data: datasave });
});

//Fetch Latest Cart Data Of concern User.
router.get("/fetchCartByUser/UserCart/:emailId", async (req, res) => {
  let findEmail = await cm.userCartModel
    .findOne({ emailId: req.params.emailId })
    .sort("-recordDate")
    .limit(1);

  if (findEmail) {
    res.send({ Message: "Cart Data Fetch Successfully", Data: findEmail });
  }
});

module.exports = router;
