// requiring some frame work
const { render } = require("ejs");
const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const uniqid = require("uniqid");
const upload = require("express-fileupload");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const verify = require("jsonwebtoken/verify");
const helmet = require("helmet");
const compression = require('compression')
// routers
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const regRouters = require("./routes/regRouters.js");
const logRouters = require("./routes/logRouters.js");
const bookRouters = require("./routes/bookRouters.js");

// exporting schemas
const { User, Cab } = require("./modules/schema");

const app = express();
// connect to mongodb

const dbURL = "mongodb://127.0.0.1:27017/cab-nuex";
// mongodb://127.0.0.1:27017/tblog-nuex
mongoose
  .connect(dbURL)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
// register view engine
app.set("view engine", "ejs");
app.set("views", "pages"); //setting my own directory

// middleware & files
app.use(express.urlencoded({ extended: true })); //used for accepting form data
app.use(express.static("assests"));
app.use(upload());
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// handle errors
const handleErrors = (err) => {
  // console.log(err.message);
  const errors = {
    dp: "",
    from: "",
    to: "",
    address: "",
    accountName: "",
    accountBank: "",
    accountNumber: "",
    vehicle: "",
  };
  if (err.message.includes("cab validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// verifying for cookies
const verifier = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "everyDay", (err, decodedmsg) => {
      if (err) {
        res.redirect("/login");
      }
      if (decodedmsg.id.status === "admin") {
        res.redirect("/admin");
      }
    });
  } else {
    res.redirect("/login");
  }
  next();
};

app.get("/", (req, res) => {
  // res.json({"emma":"nuel"});
  res.render("index", { title: "cabService" });
});
// register
app.get("/sign", (req, res) => {
  // res.json({"emma":"nuel"});
  res.render("signUp", { title: "signUp" });
});

// order
app.get("/order", async (req, res) => {
  // res.json({"emma":"nuel"});
  var froms = "";
  await Cab.find({ status: "approved" })
    .select("from")
    .then((res) => {
      // console.log(res);
      froms = res;
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(from);
  res.render("book", { title: "bookings", froms });
});

// creating addCab
app.post("/users/add", verifier, async (req, res) => {
  // console.log(req.body);
  const {
    from,
    to,
    address,
    vehicle,
    accountName,
    accountBank,
    accountNumber,
  } = req.body;
  const token = req.cookies.jwt;
  id = "";
  dirPath = "";
  // getting the user id
  jwt.verify(token, "everyDay", (err, decodedmsg) => {
    id = decodedmsg.id._id;
  });
  try {
    // working for files
    if (req.files !== null) {
      const file = req.files.file;
      const names = file.name.split(".");
      const ext_names = names[names.length - 1];
      const fileName = id + "." + ext_names;
      dirPath = "images/" + fileName;
      const mvPath = "./assests/images/" + fileName;
      await file.mv(mvPath, function (err) {
        if (err) {
        }
      });
    }
    // console.log(req.body);
    //  had a problem with waiting for file to
    const cab = await Cab.create({
      id: id,
      dp: dirPath,
      from: from,
      to: to,
      address: address,
      accountName: accountName,
      accountBank: accountBank,
      accountNumber: accountNumber,
      vehicle: vehicle,
      status: "pending",
    });
    await User.updateOne({ _id: id }, { cabStatus: "Yes" });
    res.json({
      error: false,
      errors: { dp: "", from: "", to: "", address: "", vehicle: "" },
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ error: true, errors });
  }
});

// for user dashboard
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/register", regRouters);
app.use("/login", logRouters);
app.use(bookRouters);


