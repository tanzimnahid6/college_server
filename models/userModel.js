// models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    subject: { type: String },
    university: { type: String },
    phone: { type: String },
    dob: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
