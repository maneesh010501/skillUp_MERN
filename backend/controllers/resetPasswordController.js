const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

//ResetPasswordToken - sends a link to the mail
exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Your email is not registered. Please try to signup.'
            })
        }

        const token = crypto.randomBytes(20).toString('hex');

        const updateDetails = await User.findOneAndUpdate(
            { email },
            {
                token: token,   
                resetPasswordExpires: Date.now() + 5 * 60 * 1000
            },
            { new: true }
        )

        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, 'SkillUp Password Reset', `Password Reset Link : ${url}`);

        return res.status(200).json({
            success: true,
            message: `Email sent successfully, you can visit the link : ${url} and change the password`
        })
    }
    catch (err) {
        console.log(err);
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending email for resetting password'
        })
    }
}

//ResetPassword - updates in the db
exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: 'Passwords do not match, please try again'
            })
        }

        const userDetails = await User.findOne({ token: token });

        if (!userDetails) {
            return res.json({
                success: false,
                message: 'Token is invalid'
            })
        }

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: 'Token has expired, please regenerate it.'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            updatedUser,
            message: 'Password has been updated successfully'
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while resetting the password'
        })
    }
}