const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const Links = require("../models/links");

exports.newLink = async (req, res, next) => {
  // check errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // save on db
  const { original_name } = req.body;

  const link = new Links();
  link.url = shortid.generate();
  link.name = shortid.generate();
  link.original_name = original_name;

  if (req.user) {
    const { downloads, password } = req.body;
    if (downloads) link.downloads = downloads;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }

    link.author = req.user.id;
  }

  try {
    await link.save();
    res.status(201).json({ msg: `${link.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

// Obtener el enlace

exports.getLink = async (req, res, next) => {
  // verify if link exists
  const { url } = req.params;
  const link = await Links.findOne({ url });
  console.log(link);
  if (!link) {
    res.status(404).json({ msg: "El enlace no existe" });
    return next();
  }
  res.json({
    archivo: link.name,
  });

  const { downloads, name } = link;

  if (downloads === 1) {
    // delete file
    req.file = name;
    // delete to db entry
    await Links.findOneAndRemove({ url });
    next();
  } else {
    link.downloads--;
    await link.save();
    console.log("Aun hay descargas");
  }
};
