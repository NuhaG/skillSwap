const { StatusCodes } = require("http-status-codes");
const Request = require("../models/request");
const { BadRequestError, NotFoundError } = require("../errors");

const getRequest = async (req, res) => {
  const requests = await Request.find({ requester: req.user.userId })
    .sort("createdAt")
    .populate([
      { path: "requester", select: "name email" },
      { path: "post", select: "skillOffered skillNeeded description" },
    ]);

  res.status(StatusCodes.OK).json({ requests, count: requests.length });
};

const getRequestByID = async (req, res) => {
  const request = await Request.findById(req.params.id)
    .populate("requester", "name email")
    .populate("post", "skillOffered skillNeeded description");

  if (!request) {
    throw new NotFoundError("Request not found");
  }
  res.status(StatusCodes.OK).json({ request });
};

const sendReq = async (req, res) => {
  const { post, message, status } = req.body;

  if (!post || !message) {
    throw new BadRequestError("Missing fields: post and message are required");
  }

  if (status && !["pending", "accepted", "rejected"].includes(status)) {
    throw new BadRequestError("Invalid Status code");
  }

  const newRequest = await Request.create({
    requester: req.user.userId,
    post,
    message,
    status: status || "pending",
  });

  const populatedRequest = await newRequest.populate([
    { path: "requester", select: "name email" },
    { path: "post", select: "skillOffered skillNeeded description" },
  ]);

  res.status(StatusCodes.CREATED).json({ populatedRequest });
};

module.exports = { getRequest, sendReq, getRequestByID };
