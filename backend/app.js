require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const validate = require("./routes/validateUser")
const coursehandler = require("./routes/coursehandler")
const quizhandler = require("./routes/Quizhandler")
const rolehandler = require("./routes/Tokenhandler");
const badgehandler = require("./routes/Badgehandler")

const app = express();

app.use(cors());
app.use(morgan("dev"))
app.use(express.json())
app.use("/files", express.static("files"));

mongoose.connect("mongodb://localhost:27017/OnlineLearningPlatform")
.then(()=>{
    app.listen(8081,(req,res)=>{
        console.log("Server is listening on port no 8081");  
    })
    console.log("Connected to db")
})
.catch((err) => {
    console.log(err);
})

const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null , "./files")
    },
    filename : function(req,file,cb) {
        const date = Date.now();
        cb(null, date + file.originalname);
    }
})

const upload = multer({ storage: storage });

app.post("/imageupload",upload.single("image"),async(req,res) => {
    if(!req.file){
        return res.json("Error Occured");
    }
    const filename = req.file.filename;
    res.json({"filename" : filename,"msg" : "Succesfully"})
})

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
    if (!req.file) {
        return res.json('Error Occured');
    }
    const filename = req.file.filename;
    res.json({"filename" : filename , "msg" : "Succesfully"});
});

app.get("/",(req,res)=>{
    res.send("This is harsha");
})

app.use("/badge",badgehandler);
app.use("/verifyToken",rolehandler);
app.use("/quiz",quizhandler);
app.use("/validate", validate );
app.use("/courses" , coursehandler);