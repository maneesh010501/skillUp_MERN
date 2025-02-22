const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//auth
exports.auth = async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing'
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                success: false,
                message: 'Token is invalid'
            })
        }
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while validating the token',
        })
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Student') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for students only'
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User cannot be verified, please try again'
        })
    }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Instructor') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for instructor only'
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User cannot be verified, please try again'
        })
    }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== 'Admin') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for admin only'
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User cannot be verified, please try again'
        })
    }
}