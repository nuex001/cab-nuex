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
        res.redirect("/login");
      }
      if (decodedmsg.id.status === "user") {
        res.redirect("/users/book");
      } else {
      }
    });
  } else {
    res.redirect("/login");
  }
  next();
};
// cab
router.get("/", verifier, async (req, res) => {
  Cab.find({ status: "pending" })
    .then((data) => {
      // console.log(data);
      res.render("admin/dashboard", { title: "Dashboard", data: data });
    })
    .catch((err) => {
      // console.log(err);
    });
});
// users
router.get("/users", verifier, async (req, res) => {
  User.find({ status: "user" })
    .then((data) => {
      // console.log(data);
      res.render("admin/users", { title: "users", data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});
// book
router.get("/book", verifier, (req, res) => {
  Order.find({ status: "Delivered", payment: false }).then((data) => {
    console.log(data);
    res.render("admin/bookings", { title: "bookings", data });
  });
});
// not
router.get("/not", verifier, (req, res) => {
  res.render("admin/notification", { title: "notification" });
});

router.post("/cab/", verifier, (req, res) => {
  console.log(req.body);
  Cab.updateOne({ _id: req.body.id }, { status: "approved" })
    .then((response) => {
      console.log(response.acknowledged);
      res.json({ msg: response.acknowledged });
    })
    .catch((err) => {
      res.json({ msg: false });
    });
});
// updating bookings
router.post("/booking/", verifier, (req, res) => {
  // console.log(req.body);
  Order.updateOne({ _id: req.body.id }, { payment: "true" })
    .then((response) => {
      console.log(response.acknowledged);
      res.json({ msg: response.acknowledged });
    })
    .catch((err) => {
      res.json({ msg: false });
    });
});
router.post("/post/", async (req, res) => {
  // console.log(req.body);
  userId = "";
  mainId = [];
  const { title, messages, user } = req.body;
  // console.log(user);
  try {
    if (user === "Cab") {
      await User.find({ cabStatus: "Yes" })
        .select("_id")
        .then((data) => {
          userId = data;
        });
    } else {
      await User.find()
        .select("_id")
        .then((data) => {
          userId = data;
        });
    }
    for (const data of userId) {
      // console.log(data.id);
      await User.findById(data.id)
        .select("_id")
        .then((name) => {
          // mainId.push(name);
          // console.log(name);
          return name;
        })
        .then((name) => {
          Not.create({
            userId: name._id,
            title: title,
            messages: messages,
            user: user,
          }).then((response) => {
            // console.log(response);
          });
        });
    }
    res.json({ msg: true });
  } catch (err) {
    res.json({ msg: false });
  }

  // console.log(mainId);
});
// delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  User.findByIdAndDelete(id)
    .then((result) => {
      res.json({ msg: true });
    })
    .catch((err) => {
      // console.log(err);
      res.json({ msg: false });
    });
});

module.exports = router;
