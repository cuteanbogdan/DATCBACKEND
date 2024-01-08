const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB CONNECTED!"))
  .catch((err) => console.log("MongoDB connection error: ", err));
