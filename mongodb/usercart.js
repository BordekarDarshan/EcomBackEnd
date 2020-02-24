let mongoose = require("mongoose");
let pm = require("./Product");
let rm = require("./UserRegistration");

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
  emailId: { type: String }
});

let userCartModel = mongoose.model("usercart", userCartSchema);

module.exports = { cartmodel, cartschema, userCartModel };
