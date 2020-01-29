let mongoose = require("mongoose");
let Joi = require("@hapi/joi");

let contactSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 4, max: 20 },
  email: { type: String, required: true },
  message: { type: String, required: true }
});

let contactModel = mongoose.model("ContactUs", contactSchema);

function contactvalidation(reqbody) {
  let contactError = Joi.object().keys({
    name: Joi.string().required().min(4).max(20),
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    message: Joi.string().required()
  });
  return Joi.validate(reqbody, contactError);
}

module.exports = { contactSchema, contactModel, contactvalidation };
