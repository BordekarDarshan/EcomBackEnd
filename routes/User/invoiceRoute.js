let express = require("express");
let router = express.Router();
let invoiceDB = require("../../mongodb/Invoice");
let cartDB = require("../../mongodb/UserCart");

router.post("/sendInvoiceData", async (req, res) => {
  let addData = await new invoiceDB.invoiceModel({
    email: req.body.email,
    name: req.body.name,
    contact: req.body.contact,
    pincode: req.body.pincode,
    adress: req.body.adress,
    city: req.body.city,
    StateName: req.body.StateName,
    summary: req.body.summary,
    payment: req.body.payment,
    recordDate: Date.now()
  });
  let saveData = await addData.save();
  res.send({ Message: "Data Added Successfully", Data: saveData });
});
router.get("/getInvoiceData/:email", async (req, res) => {
  let getData = await invoiceDB.invoiceModel
    .findOne({
      email: req.params.email
    })
    .sort("-recordDate")
    .limit(1);
  res.send({ Message: "Data Fetch Successfully", Data: getData });
});

module.exports = router;

//Delete Cart And Invoice Data As soon as user Clicks On Confirm Order button.

router.delete("/deleteCart/:emailId", async (req, res) => {
  let getCart = await cartDB.userCartModel.deleteMany({
    emailId: req.params.emailId
  });
  res.send({ Message: "Deleted" });
});

router.delete("/deleteInvoice/:email", async (req, res) => {
  let getInvoice = await invoiceDB.invoiceModel.deleteMany({
    email: req.params.email
  });
  res.send({ Message: "Deleted" });
});
