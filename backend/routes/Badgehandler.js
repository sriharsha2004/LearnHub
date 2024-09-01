const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifytoken");
const controller = require("../controllers/Batchhandler");

router.post("/storeBadge" , verifyToken ,controller.storeBatch );
router.get("/all",verifyToken , controller.getAllBatches);


module.exports = router;