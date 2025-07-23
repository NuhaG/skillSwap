const Request = require("../models/Request");
const mongoose = require("mongoose");

const getRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid request ID" });
  }

  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const sendReq = async (req, res) => {
  const { requester, post, message, status } = req.body;

  if (!requester || !post || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newRequest = await Request.create({
      requester,
      post,
      message,
      status: status || "pending",
    });
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: "Failed to send request" });
  }
};

module.exports = { getRequest, sendReq };