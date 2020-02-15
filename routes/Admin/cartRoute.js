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
router.post("/cartbyuser", auth, async (req, res) => {
  let getEmail = await urm.uRegisModel
    .findById(req.UserRegistration._id)
    .select("userlogin.emailId");

  if (!getEmail) {
    return res.status(402).send("Email Not Found!!! Register Or Login First");
  }
  let product = await cm.cartmodel
    .find()
    .select(["pName", "price", "quantity"]);

  let uCart = await new cm.userCartModel({
    emailId: getEmail.userlogin.emailId,
    cartItem: product
  });
  let datasave = await uCart.save();

  res.send({ Message: "Products added", Data: datasave });
});

module.exports = router;
