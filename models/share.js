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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Share",shareSchema)
