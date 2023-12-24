const express = require('express')
const router = express.Router()
const {teacherlogin,studentData} = require('../controllers/teacherController');
router.post('/teacher-login',teacherlogin);
router.get('/student-data',studentData);

module.exports = router