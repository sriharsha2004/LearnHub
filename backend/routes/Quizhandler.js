const express = require("express");
const router = express.Router();

const controller = require("../controllers/Quizhandler")
const verifyToken = require("../middleware/verifytoken");

router.get("/all",verifyToken,controller.getallquestions)
router.post("/add",verifyToken,controller.addnewquiz);
router.delete("/removequestion",verifyToken,controller.deletequestion)
router.post("/getscore",verifyToken,controller.getstudentscore);

module.exports = router;