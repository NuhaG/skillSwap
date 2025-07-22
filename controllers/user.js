const findUser = async(req,res) =>{
  res.status(200).json("Login");
}

const createUser = async (req, res) => {
  res.status(200).json("Register");
};

module.exports = {createUser,findUser};
