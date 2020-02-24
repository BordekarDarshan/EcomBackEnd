let express = require("express");
let router = express.Router();
let cm = require("../../mongodb/UserCart");
let prom = require("../../mongodb/Product");
let urm = require("../../mongodb/UserRegistration");
let auth = require("../../middleware/authorization");

//Cart for Products with OG Price
router.post("/cart", async (req, res) => {
  let newcart = await new cm.cartmodel({
    productid: req.body.productid,
    pName: req.body.pName,
    price: req.body.price,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
    recordDate: Date.now()
  });
  let cartSave = await newcart.save();

  res.send({ Message: "Saved", Data: cartSave });
});

//Cart Associated With User(Email)
router.post("/cartbyuser", async (req, res) => {
  let uCart = await new cm.userCartModel({
    emailId: req.body.emailId,
    cartItem: req.body.cartItem
  });
  let datasave = await uCart.save();

  res.send({ Message: "Products added To Respective Email", Data: datasave });
});

module.exports = router;
