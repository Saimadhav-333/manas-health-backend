const Result = require( "../model/resultModel");
const User = require('../model/userModel');
const asyncHandler=require('express-async-handler')
const { protect } = require('../middleware/authMiddleware');


const resultData = asyncHandler(async (req,res)=>{
  const finalPredictList = req.body.final_predict_list;
  const userdata=req.body.userdata;
  // console.log(userdata);
  // console.log("Received final_predict_list:", finalPredictList);
  // const user = await User.find({user:req.user.id})
  const one = finalPredictList[0][0];
  const two = finalPredictList[0][1];
  const three = finalPredictList[0][2];
  const name= userdata.name;
  const rollno = userdata.rollno;
  const user = userdata.id;

  try{
    
    const create = await Result.create({one,two,three,name,rollno,user});
    res.status(200).json({message:create});
  }
  catch(error)
  {
    res.status(400).json({message:error});
  }
  
})

module.exports={resultData}