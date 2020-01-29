let mongoose = require("mongoose");
let pm = require("../mongodb/Product");
let rm = require("../mongodb/UserRegistration");

let cartschema = new mongoose.Schema({
  productid: { type: String },
  quantity: { type: Number },
  pName: { type: String },
  price: { type: Number },
  totalPrice: { type: Number },
  offerPrice: { type: Number },
  recordDate: { type: Date },
  updatedDate: { type: Date }
});

let cartmodel = mongoose.model("cart", cartschema);

let userCartSchema = new mongoose.Schema({
  emailId: { type: String },
  cartItem: [cartschema]
});

let userCartModel = mongoose.model("usercart", userCartSchema);

module.exports = { cartmodel, cartschema, userCartModel };
