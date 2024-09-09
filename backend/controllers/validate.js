const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usermodel = require("../modals/userSchema")
const EmployeeIdmodel = require("../modals/EmployeeIdSchema")

const login = (req,res) => {

    usermodel.find({rollno : req.body.rollno}).then((data) => {
        if(data.length == 0)  res.status(200).json("Invalid User");
        else{
            bcrypt.compare(req.body.password, data[0].password, (err, isvalid) => {
                if (err) {
                    console.log(err);
                    res.json("Internal Server Error");
                } else {
                    if (isvalid){
                        const token = jwt.sign({ id : req.body.rollno , role : req.body.role} , process.env.JWT_SECRET , { expiresIn: '3d' });
                        res.json({"token" : token , data : data[0]})
                    }
                    else res.json("Invalid User");
                }
            });
        }
    })
}

const register = async (req,res) => {

    bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS)).then((encryptedpassword) => {
        req.body.password = encryptedpassword;
        console.log(encryptedpassword);
    })
    
    // console.log(req.body);
    const rollno = req.body.rollno;
    const password = req.body.password;
    const name = req.body.name;
    const role = req.body.role;

    let vt = 0;

    const data = {rollno,name,password,role}

    if(role == "Teacher"){
        const EmployeeId = req.body.rollno;       
        const employeedata = await EmployeeIdmodel.findOne({EmployeeId});
        if(!employeedata){
            vt = 1;
            res.status(200).json("Invalid User");
        }
    }
    if(vt == 0){
        const newuser = new usermodel(data);
        newuser.save()
        .then((data)=>{
            res.json(data);
        })
        .catch((err) => {
            res.json("Error Occured");
        })
    }
}

module.exports = {
    login , 
    register
}