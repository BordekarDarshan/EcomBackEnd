const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const contact = require("./routes/User/ContactRoute");
const userregi = require("./routes/User/RegistrationRoute");
const rights = require("./routes/Admin/AdminRightsRoute");
const login = require("./auth/login");
const mailer = require("./routes/User/Nodemailer");
const reset = require("./routes/Admin/ResetPass");
const category = require("./routes/Admin/ProductCRUD");
const cart = require("./routes/Admin/CartRoute");
const fileUpload = require("./routes/User/FileUploadRoute");
const productOperation = require("./routes/Admin/ProductRoute");

//First Ask for Private Key
if (!config.get("jwtprivatekey")) {
  console.error("Private key is not set!!!!!!"); // First Ask For Private key.
  process.exit(1);
}

//Mongo Centralize Localhost.......
mongoose
  .connect("mongodb://localhost/Ecom", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connection Successful....Intializing..");
  })
  .catch(() => {
    console.log("Connection Unsccessful....Terminating...");
  });

app.use(express.json());
app.use("uploads", express.static("uploads"));
app.use(morgan("tiny"));
app.use("/api", contact);
app.use("/api", userregi);
app.use("/api", login);
app.use("/api", rights);
app.use("/api", mailer);
app.use("/api/reset", reset);
app.use("/api", category);
app.use("/api", cart);
app.use("/api", fileUpload);
app.use("/api", productOperation);
app.listen(port, () => {
  console.log("Server is working on port" + port);
});
