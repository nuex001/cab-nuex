const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const verify = require("jsonwebtoken/verify");
const upload = require("express-fileupload");
const { User, Cab, Order, Not } = require("../modules/schema");
// router
const router = express.Router();
router.use(cookieParser());
router.use(upload());

const verifier = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    await jwt.verify(token, "everyDay", (err, decodedmsg) => {
      if (err) {
        // console.log(err.message);
        res.redirect("/login");
      }
      if (decodedmsg.id.status === "admin") {
        res.redirect("/admin");
        // console.log(decodedmsg.id.status);
      } else {
        // res.redirect("/users/book");
      }
    });
  } else {
    res.redirect("/login");
  }
  next();
};
addedCab = false;
cabUser = "";
// checking if user has already addedd a cab
const verifyCab = async (req, res, next) => {
  next();
};

// handling errors
const handleErrors = (err) => {
  // console.log(err);
  const errors = { from: "", to: "", address: "", vehicle: "" };
};

router.get("/book", verifier, (req, res) => {
  const token = req.cookies.jwt;
  id = "";
  // getting the user id
  jwt.verify(token, "everyDay", (err, decodedmsg) => {
    id = decodedmsg.id._id;
  });
  Order.find({ driver: id, status: "pending" }).then((data) => {
    // console.log(data);
    res.render("bookings", { title: "Bookings", data });
  });
});

router.get("/add", verifier, async (req, res) => {
  const token = req.cookies.jwt;
  // getting the user id
  await jwt.verify(token, "everyDay", async (err, decodedmsg) => {
    // console.log(decodedmsg);
    if (decodedmsg) {
      const id = decodedmsg.id._id;
      await Cab.find({ id: id })
        .then((res) => {
          cabUser = res[0];
          // console.log(res[0]);
          if (res[0] !== undefined) {
            addedCab = true;
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    }
    res.render("add", { title: "Add-cab", addedCab, cabUser });
  });
});
router.get("/not", verifier, async (req, res) => {
  const token = req.cookies.jwt;
  id = "";
  // getting the user id
  await jwt.verify(token, "everyDay", (err, decodedmsg) => {
    // console.log(err);
    if (err) {
    } else {
      id = decodedmsg.id._id;
    }
  });
  Not.find({ userId: id }).then((data) => {
    // console.log(data)
    res.render("notification", { title: "notification", data });
  });
});

router.post("/userbook", (req, res) => {
  // console.log(req.body);
  Order.updateOne({ _id: req.body.id }, { status: "Delivered" })
    .then((response) => {
      // console.log(response.acknowledged);
      res.json({ msg: response.acknowledged });
    })
    .catch((err) => {
      res.json({ msg: false });
    });
});

// deleting
router.delete("/:id",async (req,res)=>{
  const id = req.params.id;
  Not.findByIdAndDelete(id)
  .then((result) => {
    res.json({ msg: true });
  })
  .catch((err) => {
    // console.log(err);
    res.json({ msg: false });
  });
})

module.exports = router;
