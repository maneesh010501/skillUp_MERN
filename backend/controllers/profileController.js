const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require('dotenv').config();

exports.updateProfile = async (req, res) => {
    try {
        const { dateOfBirth, about, contactNumber, gender } = req.body;

        const { id } = req.user;

        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails;
        // console.log(profileId);

        const profileDetails = await Profile.findById({ _id: profileId });
        // console.log(profileDetails)

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            profileDetails
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Problem in updating profile',
        })
    }
}

//delete Account
exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.user;

        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'Could not find user'
            })
        }

        //delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        //delete students from all the enrolled courses
        await Course.updateMany(
            { studentsEnrolled: id },
            { $pull: { studentsEnrolled: id } }
        );

        //delete user
        await User.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting user'
        })
    }
}


//get user details
exports.getUserDetails = async (req, res) => {
    try {
        const { id } = req.user;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            userDetails,
            message: 'User details fetched successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while fetching user details'
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const { id } = req.user;
        // console.log('e1')
        const displayPicture = req.files.displayPicture;
        // console.log('e2')
        const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 100);
        // console.log('e3')
        console.log(image);
        // console.log('e4')
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: id },
            { image: image.secure_url },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully',
            data: updatedProfile
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Profile picture updation failed'
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const { id } = req.user;
        const userDetails = await User.findById(id).populate('courses').exec();

        if (!userDetails) {
            return res.status(404).json({
                success: true,
                message: 'Could not find User'
            })
        }

        return res.status(200).json({
            success: true,
            userDetails,
            message: 'Fetched all courses for the user'
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while getting courses'
        })
    }
}