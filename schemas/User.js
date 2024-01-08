const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  nume: {
    type: String,
    required: true,
  },
  prenume: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
