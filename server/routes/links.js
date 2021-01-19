const express = require("express");
const router = express.Router();
const {
  newLink,
  getLink,
  getAllLinks,
} = require("../controller/linkController");

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
router.get("/", getAllLinks);
router.get("/:url", getLink);
module.exports = router;
