const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, maxLength: 100 },
    email: { type: String, required: true, unique: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
    profilePic: { type: String, defaut: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
