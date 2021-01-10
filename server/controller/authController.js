const User = require("../models/User");
require("dotenv").config({ path: ".env" });

//dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.authUser = async (req, res, next) => {
  // check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Search user to verified register
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ msg: "El Usuario No existe" });
    return next();
  }
  // verify password y auth user
  if (bcrypt.compareSync(password, user.password)) {
    // create json web token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        nombre: user.name,
      },
      process.env.SECRET_KEY,
      {
        expiresIn:
          process.env.ENV === "development"
            ? "8h"
            : process.env.EXPIRATION_TOKEN,
      }
    );
    res.json({ token });
  } else {
    res.status(401).json({ msg: "Password Incorrecto" });
    return next();
  }
};

exports.userisAuth = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};
