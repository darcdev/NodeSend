require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    // get token
    const token = authHeader.split(" ")[1];
    // check jwt
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.user = user;
    } catch (error) {
      console.log(error);
      console.log("jwt no valido");
    }
  }
  next();
};
