const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');

exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, description } = req.body;

        const video = req.files.videoFile;

        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url
        });

        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: subSectionDetails._id
                }
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: 'Subsection created successfully',
            updatedSection
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Problem while creating subsection'
        })
    }
}

//update subsection
exports.updateSubSection = async (req, res) => {
    try {
        const { title, description, subSectionId } = req.body;
        // console.log('e1');
        // const video = req.files.videoFile;
        // console.log('e2');
        const subSection = await SubSection.findById(subSectionId);
        // console.log('e3');

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: 'Subsection not found'
            })
        }
        // console.log('e4');
        if (title !== undefined) {
            subSection.title = title
        }
        // console.log('e5');
        if (description !== undefined) {
            subSection.description = description
        }

        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save();

        return res.status(200).json({
            success: true,
            message: 'Subsection updated successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Problem while updating subsection'
        })
    }
}

//delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        // const { subSectionId, sectionId } = req.params;
        const { subSectionId, sectionId } = req.body;

        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId
                }
            },
            { new: true }
        )

        if (!updatedSection) {
            return res.status(404).json({
                success: true,
                message: 'Section not found'
            })
        }

        const subSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: true,
                message: 'Subsection not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Subsection deleted successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Problem while deleting subsection'
        })
    }
}