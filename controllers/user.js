const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const createUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJwt();
  res
    .status(StatusCodes.CREATED)
    .json({
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
};

const findUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("email does not exist");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Invalid Password");
  }

  const token = await user.createJwt();
  res
    .status(StatusCodes.OK)
    .json({
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
};

module.exports = { createUser, findUser };
