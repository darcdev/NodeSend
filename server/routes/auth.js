const express = require("express");
const router = express.Router();

const { authUser, userisAuth } = require("../controller/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("email", "Agrega un email valido").isEmail(),
    check("password", "El password no puede estar vacio").not().isEmpty(),
  ],
  authUser
);
router.get("/", auth, userisAuth);

module.exports = router;
