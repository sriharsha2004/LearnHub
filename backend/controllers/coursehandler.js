const coursemodel = require("../modals/courseSchema");
const modulemodel = require("../modals/moduleSchema");
const usermodel = require("../modals/userSchema")

const mongoose = require("mongoose");

const getallcourses = (req,res) => {
    coursemodel.find({})
    .then((coursedata) => {
        res.json(coursedata);
        // let enrolledcourses = [];
        // var found = 0;
        // usermodel.find({rollno: req.user.id}).then((data) => {
        //     for(let course of coursedata){
        //         found = 0;
        //         for(let x of data[0].courses){
        //             if(course._id.toString() === x.toString()){
        //                 found = 1;
        //                 break;
        //             }
        //         }
        //         enrolledcourses.push(found);
        //     }
        //     res.json({coursedata,enrolledcourses});
        // })
    })
    .catch((err) => {
        res.json("Failed");
    })
}

const createcourse = (req,res) => {
    // console.log(req.body);
    const coursedetails = {
        InstructorId : req.user.id ,
        title : req.body.title ,
        price : req.body.price,
        courseimage : req.body.courseimage ,
        description : req.body.description
    }
    const newcourse = new coursemodel(coursedetails);
    newcourse.save()
    .then((data) => {
        res.json(data);
    })
    .catch((err)=>{
        res.json("Error Occured")
    })
}

const getcoursemodules = (req,res) => {
    const courseId = req.params.id;
    modulemodel.find({courseId : courseId})
    .then((data) => {
        res.json(data);
    })
    .catch((err)=>{
        res.json("Failed to Fetch modules")
    })
}

const newmodule = (req,res) => {
    const courseId = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const pdf = req.body.pdf;
    const newmodule = new modulemodel({title,description,pdf,courseId});
    newmodule.save().then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json("Error Occured");
    })
}

const getinstructorcourses = (req,res) => {
    // const InstructorId = req.body.id;
    console.log(req.user);
    
    const InstructorId = req.user.id;
    coursemodel.find({InstructorId : InstructorId}).then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.json("Failed");
    })
}

const getenrolledcourses = async (req,res) => {
    const rollno = req.user.id;

    const user = await usermodel.findOne({ rollno }).exec();
    const courses = user.courses;
    const enrolledCourses = [];

    for (const courseId of courses) {
        const course = await coursemodel.findById(courseId).exec();
        if (course) {
            enrolledCourses.push(course);
        }
    }
    res.json(enrolledCourses);
}

const enrollforcourse = async (req,res) => {
    const courseId = req.params.id;
    const rollno = req.user.id;
    const user = await usermodel.findOne({ rollno: rollno });
    if(!user.courses.includes(courseId))
        user.courses.push(courseId);
    await user.save();
    res.json(user.courses);
}

const deletecourse = (req,res) => {
    const courseId = req.params.id;
    coursemodel.findByIdAndDelete(courseId).then((data)=>{
        
        res.json(data);
    })
    .catch((err)=>{
        res.json("Failed");
    })
    // res.json(courseId);
}

const deletemodule = (req,res) => {
    console.log(req.params.id);
    
    modulemodel.findByIdAndDelete(req.params.id).then((data)=>{
        if(data.length != 0) 
            res.json(data);
        else 
            res.json("Failed");
    })
    .catch((err)=>{
        res.json("Failed");
    })
}


module.exports = {
    getallcourses,
    createcourse,
    getcoursemodules,
    newmodule,
    getinstructorcourses,
    getenrolledcourses,
    enrollforcourse,
    deletecourse,
    deletemodule
}