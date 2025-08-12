const Request = require("../models/request");

const getRequest = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getRequestByID = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const sendReq = async (req, res) => {
  const { requester, post, message, status } = req.body;

  if (!requester || !post || !message) {
    return res
      .status(400)
      .json({
        error: "Missing fields",
        required: "requester, post and message are required fields",
      });
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

module.exports = { getRequest, sendReq, getRequestByID };
