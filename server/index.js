const express = require("express");
require("dotenv").config({ path: ".env" });
const cors = require("cors");
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

// enabled cors
const corsConfig = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsConfig));

// App port
const port = process.env.PORT || 4000;

// enabled json read body
app.use(express.json());

//enabled public folder

app.use(express.static("uploads"));

//Routes App
app.use("/api/usuarios", users);
app.use("/api/auth", auth);
app.use("/api/enlaces", links);
app.use("/api/archivos", files);

// start Appp
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening in the port ${port}`);
});
