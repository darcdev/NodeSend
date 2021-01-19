const express = require("express");
const router = express.Router();
const {
  uploadFile,
  downloadFile,
  deleteFile,
} = require("../controller/fileController");

const auth = require("../middleware/auth");

//upload files

router.post("/", auth, uploadFile);
router.get("/:file", downloadFile, deleteFile);

module.exports = router;
