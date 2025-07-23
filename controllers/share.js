const Share = require("../models/share");

const getShared = async (req, res) => {
  try {
    const shared = await Share.find();
    res.status(200).json(shared);
  } catch (error) {
    res.status(500).json({ err: "Failed to fetch Shared Skills" });
  }
};

const createShare = async (req, res) => {
  try {
    const { skillOffered, skillNeeded, description, sharedBy } = req.body;

    // const sharedBy = mongoose.Types.ObjectId(); // for testing
    if (!skillOffered || !skillNeeded || !sharedBy) {
      return res
        .status(400)
        .json({ err: "skillOffered, skillNeeded and sharedBy are required" });
    }

    const newShare = new Share({
      skillOffered,
      skillNeeded,
      description,
      sharedBy,
    });

    const save = await newShare.save();
    res.status(201).json(save);
  } catch (error) {
    res.status(500).json({ err: "Failed to create Skill" });
  }
};

module.exports = { getShared, createShare };
