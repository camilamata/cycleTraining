const express = require("express");

const controller = require("../controllers/chartsController");

const router = express.Router();

router.post("/registerChart", controller.register);
router.get("/searchChart", controller.getByName);
//router.delete("/deleteUser", controller.deleteById);
//router.put("/updateUser", controller.updateUser);

module.exports = router;