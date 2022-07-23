const express = require("express");

const controller = require("../controllers/chartsController");

const router = express.Router();

router.post("/registerChart", controller.register);
router.get("/searchChart", controller.getByName);
router.delete("/deleteChart/:id", controller.deleteById);
router.put("/updateChart/:id", controller.updateChart);

module.exports = router; 