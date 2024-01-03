//Entry point to our server
// console.log("Hello World")
const express = require('express')
const path = require('path');
const dotenv = require('dotenv').config();  //for environment variables.
const cors = require('cors');   //cross origin resource sharing. for security purpose
const {errorHandler}=require('./middleware/errorMiddleware')
const cookieParser=require('cookie-parser');

const connectDB = require('./config/db');    //writing mongodb code in db.js file.
const port = process.env.PORT || 5000     //port for our server to run on
const color = require('colors');

connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(cookieParser())
app.use('/api/goals',require('./routes/index')) //
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/teacher',require('./routes/teacherRoutes'))
app.use('/api/result',require('./routes/resultRoutes'))

app.use(errorHandler)  //Overwrite the default error handler
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})