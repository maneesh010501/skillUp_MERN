const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req, res) => {
    try {

        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const newSection = await Section.create({ sectionName });

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }, 
            })
            .exec();
        //populate section and subsection?

        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            updatedCourseDetails
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Unable to create the section, please try again'
        })
    }
}

//update section
exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;

        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            updatedSection: updatedSection,
            message: 'Section updated successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Unable to update the section, please try again'
        })
    }
}

//delete section
exports.deleteSection = async (req, res) => {
    try {
        // const { sectionId, courseId } = req.params;
        const { sectionId, courseId } = req.body;

        await Section.findByIdAndDelete(sectionId);

        //update in course or does it auto update?find out
        await Course.findByIdAndUpdate(
            courseId,
            { $pull: { courseContent: sectionId } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Unable to delete the section, please try again'
        })
    }
}