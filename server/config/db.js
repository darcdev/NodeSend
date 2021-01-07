const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.development" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log("db connected");
  } catch (error) {
    console.log(error);
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
