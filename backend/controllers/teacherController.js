const Teacher = require('../model/teacherModel')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')
//login for a teacher with given username and password
const teacherlogin = asyncHandler( async (req,res)=>{
    const {username,password}=req.body;

    //Find teacher from the database.
    const teacher = await Teacher.findOne({username});

    //If teacher found
    if(teacher && password==teacher.password){
        res.status(200).json("Login succesfull");  
    }
    else{
        res.status(400).json("error");   
    }



})

const studentData = async (req,res)=>{
    const user = await User.find({}).limit(3)
    res.status(200).json(user)

}

module.exports = {teacherlogin,studentData}