const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {User} = require("../modules/schema");
// router
const router = express.Router();

const handleErrors = (err) => {
  // console.log(err);
  let errors = {name:"",email:"",password:"",number:""};
   if (err.message.includes("user validation failed")) {
     Object.values(err.errors).forEach(({properties})=>{
      console.log(properties);
      errors[properties.path] = properties.message;
     })
   }
   return errors;
};

// for register
router.post("/", async (req, res) => {
  try {
    const { password } = req.body;
    if (password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
      req.body.password = hashedPassword;
  }
    const user = await User.create(req.body);
    res.json({error});
  } catch (err) {
    // console.log(err);
  const error = handleErrors(err);
    //  console.log(errors);
    res.json({error});
  }
});

// exports
module.exports = router;
