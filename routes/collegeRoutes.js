const express = require('express');
const { getColleges, getCollegeById,getCollegeByName } = require('../controllers/collegeController');
const router = express.Router();

router.get('/',getColleges)
router.get('/:id',getCollegeById)
router.get('/',getCollegeByName)
module.exports = router;
