const express = require("express");
const router = express.Router();
const { newLink } = require("../controller/linkController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("original_name", "Sube un archivo").not().isEmpty(),
    check("name", "Sube un archivo").not().isEmpty(),
  ],
  auth,
  newLink
);

module.exports = router;
