const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://cuteanbogdan:3J7SDFQWxQcrX3Hb@cluster.49jbqpi.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB CONNECTED!"))
  .catch((err) => console.log("MongoDB connection error: ", err));
