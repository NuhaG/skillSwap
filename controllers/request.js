const { StatusCodes } = require("http-status-codes");
const Request = require("../models/request");
const { BadRequestError, NotFoundError } = require("../errors");

const getRequest = async (req, res) => {
  const requests = await Request.find({ requester: req.user.userId })
    .sort("createdAt")
    .populate("post", "title content")
    .populate("requester", "name email");
  res.status(StatusCodes.OK).json({ requests, count: requests.length });
};

const getRequestByID = async (req, res) => {
  const request = await Request.findById(req.params.id)
    .populate("post", "title content")
    .populate("requester", "name email");

  if (!request) {
    throw new NotFoundError("Request not founs");
  }
  res.status(StatusCodes.OK).json({ request });
};

const sendReq = async (req, res) => {
  const { requester, post, message, status } = req.body;

  if (!requester || !post || !message) {
    throw new BadRequestError(
      "Missing fields: requester, post and message are required"
    );
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

  const populateRequest = (await newRequest.populate("requester", "name email"))
    .populate("post", "title content")
    .exePopulate();

  res.status(StatusCodes.CREATED).json({ populateRequest });
};

module.exports = { getRequest, sendReq, getRequestByID };
