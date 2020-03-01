let mongoose = require("mongoose");

let invoiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: Number, required: true },
  pincode: { type: Number, required: true },
  adress: { type: String, required: true },
  city: { type: String, required: true },
  StateName: { type: String, required: true },
  summary: { type: Array },
  payment: { type: String }
});

let invoiceModel = mongoose.model("invoice", invoiceSchema);

module.exports = { invoiceModel, invoiceSchema };
