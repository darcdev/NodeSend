const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
//controllers
const { createUser } = require("../controller/userController");

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email valido").isEmail(),
    check(
      "password",
      "El password debe ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  createUser
);

module.exports = router;
