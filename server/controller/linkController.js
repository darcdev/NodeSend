const Links = require("../models/links");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
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