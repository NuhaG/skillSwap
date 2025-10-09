const { BadRequestError } = require("../errors");
const Share = require("../models/share");

const getShared = async (req, res) => {
  try {
    const shared = await Share.find();
    res.status(200).json(shared);
  } catch (error) {
    res.status(500).json({ err: "Failed to fetch Shared Skills" });
  }
};

const getSharedByID = async (req, res) => {
  try {
    const shared = await Share.findById(req.params.id);
    res.status(200).json(shared);
  } catch (error) {
    res.status(500).json({ err: "Failed to fetch Shared Skills" });
  }
};

const createShare = async (req, res) => {
  const { skillOffered, skillNeeded, description } = req.body;
  if (!skillOffered || !skillNeeded) {
    throw new BadRequestError("skillOffered and skillNeeded are required");
  }
  const newShare = await Share.create({
    skillOffered,
    skillNeeded,
    description,
    sharedBy: req.user.userId,
  });
  res.status(201).json(newShare);
};

module.exports = { getShared, createShare, getSharedByID };
