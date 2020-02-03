let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let product = require("../../mongodb/Product");
// Fetch Product By Category. [Electronics Clothing]

// Fetch Product By SubCategory. [Tv Mobile || T-Shirt Jeans]

// Fetch all Products. [All Products]

// Fetch all Latest Products.

// Fetch all Offer Products. [Offer Products Will Show]

router.get("/latestproduct", async (req, res) => {
  let totaldatacount = await prom.productModel;
});
