const express = require("express");
const router = express.Router();

const {createShare, getShared,getSharedByID} = require("../controllers/share");

router.route("/share").post(createShare).get(getShared);
router.route("/share/:id").get(getSharedByID);

module.exports = router;
