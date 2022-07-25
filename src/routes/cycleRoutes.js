const express = require("express");

const controller = require("../controllers/cycleController");

const router = express.Router();

router.get("/trainning", controller.cycleAnalysis);

module.exports = router; 