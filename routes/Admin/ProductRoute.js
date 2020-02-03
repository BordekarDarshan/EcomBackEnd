let express = require("express");
let router = express.Router();
let cm = require("../../mongodb/usercart");
let prom = require("../../mongodb/Product");

router.post("/checkofferproducts", async (req, res) => {
  let offerproduct = await prom.productModel.findOne({
    isTodayOffer: req.body.isTodayOffer
  });
  if (!offerproduct) {
    res.status(402).send("No Offer Products");
  }
  res.send({ Data: offerproduct });
});

//Cart For Offer Products
router.post("/checkoffer", async (req, res) => {
  let productOffer = await prom.productModel.findById(req.body.productid);
  let offercart = await new cm.cartmodel({
    productid: req.body.productid,
    pName: productOffer.pName,
    price: productOffer.price,
    quantity: req.body.quantity,
    totalPrice: productOffer.price * req.body.quantity,
    offerPrice: productOffer.offerPrice * req.body.quantity,
    recordDate: Date.now()
  });
  let pSave = await offercart.save();

  res.send({ Message: "Saved", Data: pSave });
});

module.exports = router;
