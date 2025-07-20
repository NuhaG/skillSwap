const getShared = async (req, res) => {
  res.status(200).json("Shared Content");
};

const createShare = async (req, res) => {
  res.status(200).json("Requested Content");
};

module.exports = {getShared, createShare};
