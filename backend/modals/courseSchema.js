const mongoose = require("mongoose");

const courseschema = new mongoose.Schema({
    InstructorId : {
        type : String,
        required : true
    },
    title : {
        type : String ,
        required : true
    },
    courseimage : {
        type : String,
        required : true
    },
    price : {
        type : Number,
    },
    description : {
        type : String , 
        required : true
    }
} , {timestamps : true})

const coursemodel = mongoose.model("course",courseschema);

module.exports = coursemodel;