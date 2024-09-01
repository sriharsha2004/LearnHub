const usermodel = require("../modals/userSchema");
const modulemodal = require("../modals/moduleSchema");

const storeBatch = async (req,res) => {
    // res.json(req.body);
    const id = req.body.moduleId;
    const rollno = req.user.id;
    const user = await usermodel.findOne({rollno : rollno});
    if(!user.badges.includes(id)){
        user.badges.push(id);
        await user.save();
    }
    res.json(user);
}

const getAllBatches = async (req,res) => {
    const rollno = req.user.id;
    const user = await usermodel.findOne({rollno : rollno})
    const modules = await modulemodal.find({
        _id: { $in: user.badges }
      });
    //   console.log(modules);
    res.json(modules);
}

module.exports = {
    storeBatch,
    getAllBatches
}