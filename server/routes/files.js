const express = require("express");
const router = express.Router();
const { uploadFile, deleteFile } = require("../controller/fileController");
const auth = require("../middleware/auth");

//upload files

router.post("/", auth, uploadFile);

module.exports = router;
