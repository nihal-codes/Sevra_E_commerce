const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  location: {
    type: Array
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    default: null
  },
  verificationExpires: {
    type: Date,
    default: null
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;