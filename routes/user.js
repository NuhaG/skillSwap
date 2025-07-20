const express = require("express");
const router = express.Router();

const createUser = require("../controllers/user");

router.route("/user").post(createUser);

module.exports = router;
