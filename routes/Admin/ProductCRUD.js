let express = require("express");
let router = express.Router();
let pm = require("../../mongodb/Product"); // Product Model.

/*-----------------------------------------------SUBCATEGORY------------------------------------------------------*/

// To add New Subcategory.

router.post("/subcat", async (req, res) => {
  let { error } = pm.uSubcatValidation(req.body);
  if (error) {
    res.status(402).send(error.details[0].message);
  }
  let subCategory = await new pm.subcategoryModel({
    subcategory: req.body.subcategory,
    category: req.body.category
  });
  let subCategorySave = await subCategory.save();
  res.send({ Message: "Saved" });
});

//To Fetch Subcategory By _id.

router.get("/subcat/:subcat", async (req, res) => {
  let subcatid = await pm.subcategoryModel.findById(req.params.subcat);
  if (!subcatid) {
    return res.status(402).send("Invalid Request");
  }
  res.send(subcatid);
});

//Update Product field in Subcategory.

router.put("/usubproduct/:id", async (req, res) => {
  let data = await pm.subcategoryModel.findByIdAndUpdate(req.params.id);
  let product = await pm.productModel
    .find({ subcategory: req.body.subcategory }) //Take the specific "_id" from subcategories and add products in  subcategory
    .select(["pName", "price"]);

  data.product = product; //data.product means "data" field in subcategory = product means the field which we want to update i.e "let product"

  let categorySave = await data.save();
  res.send({ Message: "Saved" });
});

//Delete Subcategory By _id.

router.delete("/deletesubcat/:subcat", async (req, res) => {
  let subcatid = await pm.subcategoryModel.findByIdAndDelete(req.params.subcat);
  if (!subcatid) {
    return res.status(402).send("Invalid Request");
  }
  res.send({ message: "Deleted" });
});

/*-----------------------------------------------CATEGORY------------------------------------------------------*/

// To add New Category.

router.post("/cat", async (req, res) => {
  let { error } = pm.uCatValidation(req.body);
  if (error) {
    res.status(402).send(error.details[0].message);
  }
  let subcat = await pm.subcategoryModel
    .find({ category: req.body.category })
    .select(["subcategory", "category", "product"]);

  let category = await new pm.categoryModel({
    category: req.body.category,
    subcategory: subcat
  });
  let categorySave = await category.save();
  res.send({ Message: "Saved" });
});

//To Fetch Category By _id.

router.get("/cat/:cat", async (req, res) => {
  let catid = await pm.categoryModel.findById(req.params.cat);
  if (!catid) {
    return res.status(402).send("Invalid Request");
  }
  res.send(catid);
});

//Delete Category By _id.

router.delete("/deletecat/:cat", async (req, res) => {
  let catid = await pm.categoryModel.findByIdAndDelete(req.params.cat);
  if (!catid) {
    return res.status(402).send("Invalid Request");
  }
  res.send({ message: "Deleted" });
});

//Update Subcategory Field in category.

router.put("/ucatsubcategory/:id", async (req, res) => {
  let ucat = await pm.categoryModel.findByIdAndUpdate(req.params.id);

  let sub = await pm.subcategoryModel
    .find({ category: req.body.category })
    .select(["subcategory", "category", "product"]);

  ucat.subcategory = sub;

  let catsave = await ucat.save();
  res.send({ message: "updated" });
});

/*-------------------------------------------------PRODUCT-----------------------------------------------------*/

//To add New Product.

router.post("/product", async (req, res) => {
  let { error } = pm.uProductValidation(req.body);
  if (error) {
    res.status(402).send(error.details[0].message);
  }
  let product = await new pm.productModel({
    pName: req.body.pName,
    price: req.body.price,
    category: req.body.category,
    subcategory: req.body.subcategory,
    recordDate: Date.now(),
    isTodayOffer: req.body.isTodayOffer
  });
  let productsave = await product.save();
  res.send({ Message: "Saved" });
});

//Update Product.

router.put("/uproduct/:id", async (req, res) => {
  let upro = await pm.productModel.findByIdAndUpdate(req.params.id);
  (upro.pName = req.body.pName),
    (upro.price = req.body.price),
    (upro.category = req.body.category),
    (upro.subcategory = req.body.subcategory),
    (upro.updateDate = Date.now());

  let prosave = await upro.save();
  res.send({ message: "updated" });
});

//Delete product By _id.

router.delete("/deleteproduct/:pid", async (req, res) => {
  let productid = await pm.productModel.findByIdAndDelete(req.params.pid);
  if (!productid) {
    return res.status(402).send("Invalid Request");
  }
  res.send({ message: "Deleted" });
});

module.exports = router;
