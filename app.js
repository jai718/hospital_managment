const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const cookieParser = require("cookie-parser");
const registerRoute = require("./routes/registerRoute");
const doctorRoute = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logoutRoute");
const cors = require("cors");

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();
const dbURI = process.env.DATABASE;
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Server listening at port ${port}`);
    });
  })
  .catch(err => {
    console.error("DB connection error:", err);
  });

// Routes
app.get("/", (req, res) => res.send("Server listening at port 5000!"));

app.use(authRoutes);
app.use(registerRoute);
app.use(doctorRoute);
app.use(patientRoutes);
app.use(adminRoutes);
app.use(logoutRoute);

// Uncomment for production
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
