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

module.exports = { uRegisSchema, uRegisModel, uRegisSchema }; //Exporting For Future Use In Other Files
