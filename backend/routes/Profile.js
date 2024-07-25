const express = require('express');
const router = express.Router();

const { updateProfile, deleteAccount, getEnrolledCourses, updateDisplayPicture, getUserDetails } = require('../controllers/ProfileController');
const { auth } = require('../middlewares/auth');

router.put('/updateProfile', auth, updateProfile);
router.delete('/deleteProfile', auth, deleteAccount);//
router.get('/getUserDetails', auth, getUserDetails);

router.get('/getEnrolledCourses', auth, getEnrolledCourses);//
router.put('/updateDisplayPicture', auth, updateDisplayPicture);

module.exports = router;