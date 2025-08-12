const express = require("express");
const router = express.Router();

const { getRequest, sendReq, getRequestByID } = require("../controllers/request");

router.route("/request").post(sendReq).get(getRequest);
router.route("/request/:id").get(getRequestByID);

module.exports = router;
