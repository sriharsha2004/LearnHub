const express = require("express")
const router = express.Router();

const controller = require("../controllers/coursehandler")
const verifyToken = require("../middleware/verifytoken");

router.get("/all" , verifyToken, controller.getallcourses)
router.get("/modules/:id" , verifyToken , controller.getcoursemodules)
router.post("/new" , verifyToken , controller.createcourse)
router.get("/getinstructorcourses" , verifyToken , controller.getinstructorcourses)
router.post("/addmodule/:id", verifyToken , controller.newmodule);
router.get("/getenrolledcourses", verifyToken , controller.getenrolledcourses);
router.get("/enroll/:id", verifyToken , controller.enrollforcourse)
router.delete("/delete/:id",verifyToken,controller.deletecourse);
router.delete("/deletemodule/:id",verifyToken,controller.deletemodule);

module.exports = router;