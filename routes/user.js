const express = require("express");
const router = express.Router();

const {createUser, findUser} = require("../controllers/user");

router.route("/login").post(findUser);
router.route("/register").post(createUser);

module.exports = router;
