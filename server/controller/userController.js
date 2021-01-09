// model mongo
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  //show message errors from express validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  // verify if user exists
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: "El usuario ya esta registrado" });
  }
  // create new user
  user = new User({ name, email, password });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    await user.save();
    res.status(201).json({ msg: "Usuario Creado Correctamente" });
  } catch (error) {
    console.log("Error al crear un usuario");
  }
};
