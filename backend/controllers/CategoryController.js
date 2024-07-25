const Category = require('../models/Category');
const Course = require('../models/Course');

// create category
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All field are required'
            })
        }

        const categoryDetails = await Category.create({ name, description });

        return res.status(200).json({
            success: true,
            message: 'Category created successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating category'
        })
    }
}

//get all categories
exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({});
        return res.status(200).json({
            success: true,
            message: 'All Categories are returned',
            allCategories
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while getting categories'
        })
    }
}

//categoryPageDetails 
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const selectedCategory = await Category.findById(categoryId)
            .populate('course')
            .exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: 'No courses found for the selected category'
            })
        }

        const differentCategories = await Category.find({
            _id: { $ne: categoryId }
        })
            .populate('course')
            .exec();

        //get top 10 selling courses
        const topSellingCourses = await Course.aggregate([
            {
                $addFields: { studentsCount: { $size: '$studentsEnrolled' } }
            },
            {
                $sort: { studentsCount: -1 }
            },
            {
                $limit: 10
            }
        ]).exec();

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                topSellingCourses,
                differentCategories
            }
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}