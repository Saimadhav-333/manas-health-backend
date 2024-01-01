const resultData = (req,res)=>{
    console.log("Received GET request on Node.js server");

  // Retrieve the final_predict_list from the request body
  const finalPredictList = req.body.final_predict_list;

  // Do something with the final_predict_list
  console.log("Received final_predict_list:", finalPredictList);

  // Respond to the Flask application
  res.json({ message: "GET request received successfully on Node.js server." });

}

module.exports={resultData}