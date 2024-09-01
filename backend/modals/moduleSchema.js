const mongoose = require("mongoose");

const moduleschema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    pdf : {
        type : String
    },
    courseId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
} , {timestamps : true})

const modulemodel = mongoose.model("module",moduleschema);

module.exports = modulemodel;