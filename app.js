const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db");
const passport = require("passport");
require("./passport.js")(passport);
const cors = require("cors");

// Routers
const authRouter = require("./routes/auth");
const tokenRouter = require("./routes/token");
const dashboardRouter = require("./routes/dashboard");
const problemsRouter = require("./routes/problems");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/token", tokenRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/problems", problemsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
