let express = require("express");
let urm = require("../mongodb/UserRegistration");
let auth = require("../middleware/authorization");
let admin = require("../middleware/admin");
let router = express.Router();

router.delete("/removeu/:id", [auth, admin], async (req, res) => {
  let data = await urm.uRegisModel.findByIdAndRemove(req.params.id);
  if (!data) {
    res.status(304).send("not deleted");
  }
  res.send({ message: "removed" });
});

module.exports = router;
