let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let product = require("../../mongodb/Product");

// Fetch Product By Category. [Electronics Clothing]
router.get("/product/electronics", async (req, res) => {
  let getData = await product.productModel.findOne({ category: "Electronics" });

  res.send({ Message: "Fetch Successfully", Data: getData });
  console.log(getData);
});

router.get("/product/Clothing", async (req, res) => {
  let getData = await product.productModel.findOne({ category: "Clothing" });

  res.send({ Message: "Fetch Successfully", Data: getData });
});

// Fetch Product By SubCategory. [Tv Mobile || T-Shirt Jeans]

// Fetch all Products. [All Products]

router.get("/allproducts", async (req, res) => {
  let getData = await product.productModel.find();

  res.send({ Message: "Fetch Successfully", Data: getData });
});

// Fetch all Latest Products.

router.get("/product/latestproduct", async (req, res) => {
  let getData = await product.productModel.find().sort("recordDate");

  res.send({ Message: "Fetch Successfully", Data: getData });
});

// Fetch all Offer Products. [Offer Products Will Show]

router.get("/product/offerproduct", async (req, res) => {
  let getData = await product.productModel.findOne({ isTodayOffer: "true" });

  if (!getData) {
    return res.send("Currently there are no offers on Products.");
  }

  res.send({ Message: "Fetch Successfully", Data: getData });
});

module.exports = router;
