const express = require('express')
const router=express.Router()
const {resultData}=require('../controllers/resultController')

router.get('/student-result',resultData)


module.exports=router