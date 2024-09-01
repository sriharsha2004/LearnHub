const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    rollno : {
        type : String ,
        unique: true,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId }],
    quizScores : [ {
        moduleId : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        score : {
            type : Number,
            required : true
        }
    }],
    badges : [{ type: mongoose.Schema.Types.ObjectId }]
},{timestamps : true})

const usermodel = mongoose.model("user" , schema);

module.exports = usermodel;

