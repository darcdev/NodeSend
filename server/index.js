const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect to database
connectDB();

// App port
const port = process.env.PORT || 4000;
// start App

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening in the port ${port}`);
});
