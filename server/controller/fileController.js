const fs = require("fs");
const multer = require("multer");
const shortid = require("shortid");
const links = require("../models/links");
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

exports.downloadFile = async (req, res, next) => {
  // get link
  const { file } = req.params;
  const link = await link.findOne({ name: file });

  const fileDownload = __dirname + "/../uploads/" + req.params.file;
  res.download(fileDownload);

  // Eliminar file on db
  const { downloads, name } = link;

  if (downloads === 1) {
    // delete file
    req.file = name;
    // delete to db entry
    await Links.findOneAndRemove(link.id);
    next();
  } else {
    link.downloads--;
    await link.save();
    console.log("Aun hay descargas");
  }
};
