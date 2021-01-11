const express = require("express");
const app = express();

// DB
const connectDB = require("./config/db");

//routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const links = require("./routes/links");
const files = require("./routes/files");

// connect to database
connectDB();

// App port
const port = process.env.PORT || 4000;

// enabled json read body
app.use(express.json());
//Routes App
app.use("/api/usuarios", users);
app.use("/api/auth", auth);
app.use("/api/enlaces", links);
app.use("/api/archivos", files);

// start Appp
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening in the port ${port}`);
});
