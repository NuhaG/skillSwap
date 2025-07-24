const express = require("express");
const router = express.Router();

const { getRequest, sendReq } = require("../controllers/request");

router.route("/request").post(sendReq).get(getRequest);

module.exports = router;
