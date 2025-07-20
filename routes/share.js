const express = require("express");
const router = express.Router();

const {createShare, getShared} = require("../controllers/share");

router.route("/share").post(createShare).get(getShared);

module.exports = router;
