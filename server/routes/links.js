const express = require("express");
const router = express.Router();
const { newLink, getLink } = require("../controller/linkController");
const { deleteFile } = require("../controller/fileController");

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

router.get("/:url", getLink, deleteFile);
module.exports = router;
