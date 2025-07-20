const getRequest = async (req, res) => {
  res.status(200).json("get request by id");
};

const sendReq = async (req, res) => {
  res.status(200).json("Request sent");
};

module.exports = { getRequest, sendReq };
