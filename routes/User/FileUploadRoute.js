let express = require("express");
let router = express.Router();
let fm = require("../../mongodb/Product");
let multer = require("multer");

let imgport = "http://localhost:4000";

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/fileupload", upload.single("image"), async (req, res) => {
  let file = new fm.fileModel({
    image: imgport + "/uploads" + req.file.filename
  });
  if (!file) {
    return res.status(402).send("File not found !!!");
  }
  let data = await file.save();
  res.send({
    Message: "File Uploaded",
    File: data
  });
});
module.exports = router;
