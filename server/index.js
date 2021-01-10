const express = require("express");
const connectDB = require("./config/db");

//routes
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

// connect to database
connectDB();

// App port
const port = process.env.PORT || 4000;

// enabled json read body
app.use(express.json());
//Routes App
app.use("/api/usuarios", users);
app.use("/api/auth", auth);

// start Appp

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening in the port ${port}`);
});
