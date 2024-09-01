const quizmodel = require("../modals/QuizSchema")
const usermodel = require("../modals/userSchema")

const addnewquiz = async (req,res) => {
    const id = req.body.moduleId;
    const data = await quizmodel.findOne({ moduleId: id });
    // res.json(data);
    console.log(req.body);
    data.questions.push(req.body.questions[0]);
    await data.save();
    res.json(data.questions);
}

const getallquestions = (req,res) => {
    const id = req.query.moduleId;
    // console.log(id);
    quizmodel.find({moduleId : id}).then((data) => {
        res.json(data[0]);
    })
    .catch((err) => {
        res.json("Error Occurred");
    })
}

const deletequestion = async (req,res) => {
    const id = req.body.moduleId;
    const questionId = req.body.questionId;
    const data = await quizmodel.findOne({ moduleId: id });
    data.questions = data.questions.filter(question => question._id.toString() !== questionId)
    await data.save();
    res.json(data.questions);
}

const getstudentscore = async (req,res) => {
    // console.log(req.body)
    const id = req.body.moduleId;
    const data = await quizmodel.findOne({ moduleId: id });
    const Studentanswers = req.body.Studentanswers;
    let score = 0;
    for(let x in Studentanswers){
        // console.log(x,Studentanswers[x]);
        for (const question of data.questions) {
            if(question._id.toString() === x){
                if(question.correctAnswer === Studentanswers[x]) {
                    score++;
                }
            }
        }        
    }
    // console.log(score);
    // res.json(score);
    let found = false;
    const user = await usermodel.findOne({ rollno: req.user.id });
    const quizscore = {moduleId : id , score : score}
    for(let x of user.quizScores){
        if(x.moduleId.toString() === id){
            found = true;
            x.score = score;
        }
    }
    if(found == false){
        user.quizScores.push(quizscore)
    }
    await user.save();
    res.json(score);
}

module.exports = {
    addnewquiz,
    getallquestions,
    deletequestion,
    getstudentscore
}