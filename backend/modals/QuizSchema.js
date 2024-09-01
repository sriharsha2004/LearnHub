const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    moduleId : { type: mongoose.Schema.Types.ObjectId },
    questions: [{
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    }]
} , {timestamps : true})

const quizmodel = mongoose.model("quiz",schema);

module.exports = quizmodel;