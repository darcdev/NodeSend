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
  const { original_name, name } = req.body;

  const link = new Links();
  link.url = shortid.generate();
  link.name = name;
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
// all links

exports.getAllLinks = async (req, res, next) => {
  try {
    const links = await Links.find({}).select("url -_id");
    res.json({ enlaces: links });
  } catch (error) {
    console.log(error);
  }
};

// Obtener el enlace

exports.getLink = async (req, res, next) => {
  // verify if link exists
  const { url } = req.params;
  const link = await Links.findOne({ url });
  if (!link) {
    res.status(404).json({ msg: "El enlace no existe" });
    return next();
  }
  res.json({
    archivo: link.name,
    password: false,
  });

  next();
};

exports.havePassword = async (req, res, next) => {
  // verify if link exists
  const { url } = req.params;
  const link = await Links.findOne({ url });
  if (!link) {
    res.status(404).json({ msg: "El enlace no existe" });
    return next();
  }

  if (link.password) {
    return res.json({
      password: true,
      link: link.url,
    });
  }
  next();
};

exports.verifyPassword = async (req, res, next) => {
  const { url } = req.params;
  const { password } = req.body;

  // search by link
  const link = await Links.findOne({ url });

  if (bcrypt.compareSync(password, link.password)) {
    // let download file
    next();
  } else {
    return res.status(401).json({ msg: "Password incorrecto" });
  }
  console.log(req.body);
};
