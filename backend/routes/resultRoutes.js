const express = require('express')
const router=express.Router()
const {protect} = require('../middleware/authMiddleware')
const {resultData}=require('../controllers/resultController')

router.get('/student-result',resultData)


module.exports=router