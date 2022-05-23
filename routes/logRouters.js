const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const verify = require("jsonwebtoken/verify");
const {User} = require("../modules/schema");
// router
const router = express.Router();

router.use(cookieParser());

//
const createToken = (id) => {
  return jwt.sign({ id }, "everyDay");
};

router.get("/", (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "everyDay", (err, decodedmsg) => {
      if (err) {
        res.redirect("/login");
      }
      if (decodedmsg.id.status === "admin") {
        res.redirect("/admin");
      }else{
        res.redirect("/users/book");
      }
    });
  }
  res.render("logIn", { title: "login" });
});

router.post("/", async (req, res) => {
  const { name, password } = req.body;
  User.find({ name })
    .then((result) => {
      if (result.length != 0) {
        // console.log(result[0]);
        bcrypt.compare(password, result[0].password, function (err, response) {
          if (response) {
            var cookie = req.cookies.jwt;
            if (cookie === undefined) {
              const token = createToken(result[0]);
              res.cookie("jwt", token, {
                httpOnly: true,
              });
              res.json({ msg: "successfull",status:result[0].status});
            }else{
                res.json({ msg: "successfull",status:result[0].status});
            }
          } else {
            res.json({ msg: "empty" });
          }
        });
      } else {
        res.json({ msg: "empty" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
