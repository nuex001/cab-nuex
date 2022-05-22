const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const verify = require("jsonwebtoken/verify");
const { User, Cab, Order } = require("../modules/schema");

// routers
const router = express.Router();
router.use(cookieParser());

//
router.post("/getFrom", (req, res) => {
  // console.log(req.body.from);
  Cab.find({ from: req.body.from })
    .select("to")
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/getTo", async (req, res) => {
  // console.log(req.body);
  const { from, to } = req.body;
  id = "";
  names = [];
  try {
    await Cab.find({ from, to })
      .select("id")
      .then((data) => {
        id = data;
      });
    for (const data of id) {
      // console.log(data.id);
      await User.findById(data.id)
        .select("name")
        .then((name) => {
          names.push(name);
        });
    }
    // console.log(names);
    res.json(names);
  } catch (err) {
    console.log(err);
  }
});
// for booking
router.post("/book", async (req, res) => {
  //   console.log(req.body);
  dp = "";
  username = "";
  Order.create(req.body).then();
  await Cab.findOne({ id: req.body.driver })
    .select("dp")
    .then((id) => {
      //   console.log(id);
      dp = id.dp;
    });
  await User.findOne({ _id: req.body.driver }).then((id) => {
    // console.log(id);
    username = id.name;
  });
  //
  res.json({ error: false, dp, username });
});

module.exports = router;
