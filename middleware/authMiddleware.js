const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "Please provide token" });
  }
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, username } = decoded;
      req.user = { id, username };
      next();
    } catch (error) {
      res.status(401).json({ msg: "Unathorized" });
    }
  }
};

module.exports = { authMiddleware };
