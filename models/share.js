const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
  skillOffered: {
    type: String,
    required: true,
  },
  skillNeeded: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  sharedBy: {
    type: String,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true});

module.exports = mongoose.model("Share",shareSchema)
