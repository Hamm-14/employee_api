const express = require("express");

const router = express.Router(); //using express router

router.use("/employee", require("./employee"));

module.exports = router;
