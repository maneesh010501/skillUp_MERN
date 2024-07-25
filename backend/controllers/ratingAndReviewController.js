const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const mongoose = require('mongoose');

exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;

        const { rating, review, courseId } = req.body;

        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: userId
            }
        )

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in this course'
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user: userId,
                course: courseId
            }
        )
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Student has already reviewed this course'
            })
        }

        const ratingReview = await RatingAndReview.create({ rating, review, course: courseId, user: userId });

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $push: { ratingAndReviews: ratingReview._id }
            },
            { new: true }
        )
        console.log(updatedCourseDetails);

        return res.status(200).json({
            success: true,
            message: 'Rating and Review created successfully',
            ratingReview
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Error while creating rating and review'
        })
    }
}

exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null, // when we want to make a single group
                    averageRating: { $avg: '$rating' }
                }
            }
        ])
        // result will look like this :
        // result = [
        //     {
        //         _id: null,
        //         averageRating: 4.5
        //     }
        // ];
        //if no ratings are given,then result = [] in case of await

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating
            })
        }

        return res.status(200).json({
            success: true,
            message: 'No ratings were given for this course',
            averageRating: 0
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Error while getting average rating'
        })
    }
}

exports.getAllRatingAndReviews = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: 'desc' })
            .populate({
                path: 'user',
                select: 'firstName lastName email image'
            })
            .populate({
                path: 'course',
                select: 'courseName'
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: 'All reviews fetched successfully',
            data: allReviews
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//get reviews for specific course
exports.getRatingForCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const ratingAndReviews = await RatingAndReview.find(
            { course: courseId }
        );
        if (!ratingAndReviews) {
            return res.status(404).json({
                success: false,
                message: 'This course is not rated yet'
            })
        }
        return res.status(200).json({
            success: true,
            message: `Reviews for the course with id ${courseId}`,
            ratingAndReviews
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Problem getting the reviews for this course'
        })
    }
}