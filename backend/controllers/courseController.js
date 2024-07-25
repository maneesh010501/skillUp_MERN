const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

exports.createCourse = async (req, res) => {
    try {
        let { courseName, courseDescription, whatYouWillLearn, price, tag, category, status,
            instructions } = req.body;

        const thumbnail = req.files.thumbnail;

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !category || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log(instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor not found'
            })
        }

        //check category is valid or not -> for testing in postman
        const categoryDetails = await Category.findById(category);//category is an id

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status,
            instructions
        })

        //add new course to instructor db
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {

                $push: {
                    courses: newCourse._id
                }

            },
            { new: true }
        )

        //update category schema
        await Category.findByIdAndUpdate(
            { _id: categoryDetails._id },
            {
                $push: {
                    course: newCourse._id
                }
            },
            { new: true }
        )

        //res
        return res.status(200).json({
            success: true,
            message: 'Course created successfully',
            data: newCourse
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Problem in course creation'
        })
    }
}

//get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({});

        return res.status(200).json({
            success: true,
            message: 'All Courses fetched successfully',
            data: allCourses
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Problem in fetching courses'
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: 'instructor',
                populate: {
                    path: 'additionalDetails'
                }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            })
            .exec();

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with id ${courseId}`
            })
        }

        return res.status(200).json({
            success: true,
            courseDetails: courseDetails,
            message: 'Course Details fetched successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Could not get courses details'
        })
    }
}