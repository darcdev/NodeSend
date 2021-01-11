const fs = require("fs");
const multer = require("multer");
const shortid = require("shortid");
require("dotenv").config({ path: ".env" });

exports.uploadFile = async (req, res, next) => {
  const FILE_SIZE_LIMIT = process.env.FILE_SIZE_LIMIT;

  const multerConfig = {
    limits: { fileSize: req.usuario ? FILE_SIZE_LIMIT * 10 : FILE_SIZE_LIMIT },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(multerConfig).single("file");

  upload(req, res, async (error) => {
    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.deleteFile = async (req, res) => {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
  } catch (error) {
    console.log(error);
  }
};
