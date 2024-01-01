const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')



//Registering new user method:post  It is public
const registerUser= asyncHandler(async (req,res)=>{
    const {name,password,rollno,phoneno,email} = req.body 
    if(!name ||  !password ||  !rollno || !phoneno || !email){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({rollno})
    if(userExists){
        res.status(400)
        throw new Error('User already exits')
    }

    //Hash password-- bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //Create user
    const user = await User.create({
        name,
        phoneno,
        rollno,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            rollno:user.rollno,
            phoneno:user.phoneno,
            email:user.email,
            // token: generateToken(user._id)
        })
        // res.json(`${user.name} registered successfully`);
    }else{
        res.status(400)
        throw new Error("invalid user data")
    }
    // res.json({message:'Register User'})

})

// for log in. it will go into api/users/login
const loginUser=asyncHandler(async (req,res)=>{

    const {rollno,password}=req.body

    //checking for user rollno
    const user = await User.findOne({rollno})
    // if (user) {
    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    
    //     if (isPasswordValid) {
    //       res.status(200).json({
    //         _id: user.id,
    //         name: user.name,
    //         phoneno: user.phoneno,
    //         rollno: user.rollno,
    //         password: user.password,
    //         token: generateToken(user._id, user.name, user.phoneno, user.rollno, user.password),
    //       });
    //     } else {
    //       res.status(401).json({ error: "Invalid password" });
    //     }
    //   } else {
    //     res.status(404).json({ error: "User not found" });
    //   }

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            phoneno:user.phoneno,
            rollno:user.rollno,
            password:user.password,
            token :  generateToken(user._id,user.name,user.phoneno,user.rollno,user.password)
        })
        // res.cookie(token);
    }
    else{
        res.status(400)
        throw new Error("invalid credential")
    }
    

})
//This is private.
// api/users/me
const getMe=asyncHandler(async (req,res)=>{

    const {_id,name,rollno,phoneno,password} = await User.findById(req.user.id)
    res.status(200).json({
      id: _id,
      name,
      rollno,
      phoneno,
      password
    });

})

const changePassword = asyncHandler(async (req, res) => {
    const { rollno, password, changepassword } = req.body;
    const user = await User.findOne({ rollno });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(changepassword, salt);
  
      // Update the user's password with the newly hashed password
      user.password = hashedNewPassword;
      await user.save();
  
      // Generate a new token after changing the password
      const newToken = generateToken(user._id, user.name, user.phoneno, user.rollno, hashedNewPassword);
  
      res.status(200).json({
        message: "Password changed successfully",
        token: newToken,
      });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  });

//Generating a token i.e JWT
const generateToken = (id,name,phoneno,rollno)=>{
    return jwt.sign({id,name,phoneno,rollno},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })

}

const getUsers = asyncHandler(async(req,res)=> {
    const users = await User.find({});
    res.status(200).json(users);
})



module.exports={
    registerUser,
    loginUser,
    getMe,
    getUsers,
    changePassword
}