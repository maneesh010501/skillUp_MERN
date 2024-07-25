const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require("../models/Profile");
const mailSender = require('../utils/mailSender');
require('dotenv').config();

//send otp
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User already exists'
            })
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        console.log("OTP : ", otp);

        //check otp is unique or not
        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        const otpBody = await OTP.create(otpPayload);
        console.log("otp doc : ", otpBody);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp
        })
    }

    catch (err) {
        console.log(err);
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//signup
exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and ConfirmPassword values do not match'
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: 'User already exists'
            })
        }

        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        //sort({ createdAt: -1 }) - sorts the results based on the createdAt field in descending order (-1 means descending order), ensuring that the most recent OTP document comes first.
        // .limit(1) -  limits the number of documents returned to just one, ensuring that only the most recent OTP document is retrieved.

        console.log("recentOtp of ", recentOtp);

        if (recentOtp.length === 0) {
            res.status(400).json({
                success: false,
                message: 'Otp is not found'
            })
        }
        else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })

        //entry in db
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        })

        return res.status(200).json({
            success: true,
            message: 'User is registered successfully',
            user
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'User could not be registered. Please try again!'
        })
    }
}

//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'User is not registered, please signup first'
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '5h'
            })
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie('token', token, options).status(200).json({
                sucess: true,
                token,
                user,
                message: 'Logged in successfully'
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Login failure, please try again'
        })
    }
}

//change password
exports.changePassword = async (req, res) => {
    try {
        console.log('e1')
        const userDetails = await User.findById(req.user.id);
        console.log('e2')
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: 'Please enter all the details'
            })
        }
        console.log('e3')
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        console.log('e4')
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            })
        }
        console.log('e5')
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match, please try again'
            })
        }
        console.log('e6')
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        console.log('e7')
        const updatedUserDetails = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { password: encryptedPassword },
            { new: true }
        )
        console.log("updated user details: ", updatedUserDetails);
        console.log('e8')
        try {
            const mailResponse = await mailSender(updatedUserDetails.email, 'SkillUp Password updated', `Hello ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}, your SkillUp password is updated successfully`);
            console.log("Email response after password updation : ", mailResponse);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong while sending email of updated password'
            })
        }

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            message: 'Password updated successfully'
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating password'
        })
    }
}