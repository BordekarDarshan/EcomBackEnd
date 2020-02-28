let express = require("express");
let router = express.Router();
let product = require("../../mongodb/Product");

// Fetch Product By Category. [Electronics Clothing]

router.get("/category/:category", async (req, res) => {
  let getData = await product.productModel.find({
    category: req.params.category
  });

  res.send({ Message: "Fetch Successfully", Data: getData });
  console.log(getData);
});

// Fetch Product By SubCategory. [Tv Mobile || T-Shirt Jeans]

router.get("/category/:category/subcategory/:subcategory", async (req, res) => {
  let getData = await product.productModel.find({
    category: req.params.category,
    subcategory: req.params.subcategory
  });
  if (!getData) {
    return res.status(503).send({ Message: "Server Temporarily Available" });
  }

  res.send({ Message: "Data Fetch Successfully", Data: getData });
});

// Fetch all Products. [All Products]

router.get("/allproducts", async (req, res) => {
  let getData = await product.productModel.find();

  res.send({ Message: "Fetch Successfully", Data: getData });
});

// Fetch Product By Id. [Specific Product]

router.get("/ParticularProduct/:id", async (req, res) => {
  let getData = await product.productModel.findById({ _id: req.params.id });

  if (!getData) {
    return res.status(503).send({ Message: "Server Temporarily Available" });
  }

  res.send({ Message: "Fetch Successfully", Data: getData });
});

router.get("/OneProduct/:id", async (req, res) => {
  let getData = await product.productModel.findById(req.params.id);

  if (!getData) {
    return res.status(503).send({ Message: "Server Temporarily Available" });
  }

  res.send({ Data: getData });
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
