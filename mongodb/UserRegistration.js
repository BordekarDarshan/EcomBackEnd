let mongoose = require("mongoose");
let joi = require("@hapi/joi");
let jwt = require("jsonwebtoken");
let config = require("config");

//Schema
let uRegisSchema = new mongoose.Schema({
  firstname: { type: String },
  userlogin: {
    emailId: { type: String },
    password: { type: String }
  },
  termsPasswordCheck: { type: Boolean },
  isadmin: { type: Boolean },
  recordDate: { type: Date },
  updateDate: { type: Date },
  resetPasswordToken: { type: String },
  resetTokenExpires: { type: Date }
});

uRegisSchema.methods.tokenValidation = function() {
  let token = jwt.sign(
    { _id: this._id, isadmin: this.isadmin },
    config.get("jwtprivatekey")
  );
  return token; //practice
};

//Model
let uRegisModel = mongoose.model("UserRegistration", uRegisSchema);

//Validation
function uRegisvalidation(reqbody) {
  let schema = joi.object().keys({
    firstname: joi
      .string()
      .min(3)
      .max(20)
      .required(),
    userlogin: {
      emailId: joi
        .string()
        .required()
        .email({ minDomainSegments: 2 }),
      password: joi
        .string()
        .required()
        .min(3)
        .max(20),
      confirmPass: joi
        .any()
        .valid(joi.ref("password"))
        .required()
        .options({ language: { any: { allowOnly: "must match password" } } })
    },
    termsPasswordCheck: joi.boolean().required()
  });
  return joi.validate(reqbody, schema);
}

module.exports = { uRegisSchema, uRegisModel, uRegisvalidation, uRegisSchema }; //Exporting For Future Use In Other Files
