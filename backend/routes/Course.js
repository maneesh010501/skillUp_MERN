const express = require('express');
const router = express.Router();

const { createCourse, getAllCourses, getCourseDetails } = require('../controllers/courseController');
const { createCategory, showAllCategories, categoryPageDetails } = require('../controllers/CategoryController');
const { createSection, updateSection, deleteSection } = require('../controllers/sectionController');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subsectionController');
const { createRating, getAverageRating, getAllRatingAndReviews } = require('../controllers/ratingAndReviewController');
const { auth, isInstructor, isAdmin, isStudent } = require('../middlewares/auth');

//course routes
router.post('/createCourse', auth, isInstructor, createCourse);
router.post('/addSection', auth, isInstructor, createSection);
router.put('/updateSection', auth, isInstructor, updateSection);
router.delete('/deleteSection', auth, isInstructor, deleteSection);
router.post('/addSubsection', auth, isInstructor, createSubSection);
router.put('/updateSubsection', auth, isInstructor, updateSubSection);
router.delete('/deleteSubsection', auth, isInstructor, deleteSubSection);
router.get('/getAllCourses', getAllCourses);
router.get('/getCourseDetails', getCourseDetails);

//admin routes
router.post('/createCategory', auth, isAdmin, createCategory);

//category
router.get('/showAllCategories', showAllCategories);
router.get('/categoryPageDetails', categoryPageDetails);

//rating and review
router.post('/createRating', auth, isStudent, createRating);//
router.get('/getAverageRating', getAverageRating);//
router.get('/getAllRatingAndReviews', getAllRatingAndReviews);

module.exports = router;