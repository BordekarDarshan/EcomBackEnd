let mongoose = require("mongoose");
let Joi = require("@hapi/joi");

//Product Database.

let productSchema = new mongoose.Schema({
  pName: { type: String, minlength: 2, maxlength: 30 },
  price: { type: Number, minlength: 1, required: true },
  category: { type: String },
  subcategory: { type: String },
  recordDate: { type: Date },
  updateDate: { type: Date },
  isadmin: { type: Boolean },
  //image: { type: String, required: true },
  description: { type: String, required: true, minlength: 2, maxlength: 50 },
  offerPrice: { type: Number },
  isAvailable: { type: Boolean, required: true },
  isTodayOffer: { type: Boolean }
});

let productModel = mongoose.model("product", productSchema);

//Subcategory Database.

let subcategorySchema = new mongoose.Schema({
  subcategory: { type: String },
  category: { type: String },
  product: [productSchema]
});

let subcategoryModel = mongoose.model("subcategory", subcategorySchema);

//Category Database.

let categorySchema = new mongoose.Schema({
  category: { type: String },
  subcategory: [subcategorySchema]
});

let categoryModel = mongoose.model("category", categorySchema);

let fileSchema = new mongoose.Schema({
  image: { type: String, required: true }
});

let fileModel = mongoose.model("file", fileSchema);

//Validation

function uProductValidation(reqbody) {
  let schema = Joi.object().keys({
    pName: Joi.string()
      .min(2)
      .max(40)
      .required(),
    price: Joi.number()
      .min(1)
      .required(),
    category: Joi.string()
      .min(2)
      .max(40)
      .required(),
    subcategory: Joi.string()
      .min(2)
      .max(40)
      .required(),
    offerPrice: Joi.number().required(),
    isTodayOffer: Joi.boolean().required(),
    isAvailable: Joi.boolean().required(),
    description: Joi.string().required()
  });
  return Joi.validate(reqbody, schema);
}
function uSubcatValidation(reqbody) {
  let schema = Joi.object().keys({
    subcategory: Joi.string()
      .min(2)
      .max(40)
      .required(),
    category: Joi.string()
      .min(2)
      .max(40)
      .required()
  });
  return Joi.validate(reqbody, schema);
}

function uCatValidation(reqbody) {
  let schema = Joi.object().keys({
    category: Joi.string()
      .min(2)
      .max(40)
      .required()
  });
  return Joi.validate(reqbody, schema);
}

//Export.

module.exports = {
  subcategoryModel,
  categoryModel,
  productModel,
  productSchema,
  fileModel,
  uProductValidation,
  uSubcatValidation,
  uCatValidation
};
