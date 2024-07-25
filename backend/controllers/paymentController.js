const { instance } = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const mongoose = require('mongoose');

exports.capturePayment = async (req, res) => {
    const userId = req.user.id;
    const courseId = req.body;

    if (!courseId) {
        return res.status(404).json({
            success: false,
            message: 'Please enter a course ID'
        })
    }

    let course;
    try {
        course = await Course.find(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Could not find the course'
            })
        }

        const uid = mongoose.Types.ObjectId(userId);//converting userId from string type to ObjectId

        if (course.studentsEnrolled.includes(uid)) {
            return res.json({
                success: false,
                message: 'User is already enrolled in the course'
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Problem in validating course details'
        })
    }

    //order create
    const amount = course.price;
    const currency = 'INR';

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random().toString(),
        notes: {
            courseId: courseId,
            userId
        }
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        })
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: 'Could not initiate order'
        })
    }
}

exports.verifySignature = async (req, res) => {
    const webhookSecret = '1234';

    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = ('hexshasum.digest');

    if (signature === digest) {
        console.log('Payment is Authorised!');

        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )

            if (!enrolledCourse) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                })
            }

            console.log(enrolledCourse);

            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            )

            console.log(enrolledStudent);

            //send mail
            const emailResponse = await mailSender(enrolledStudent.email, "Congratulations from SkillUp", `Congratulations, you are have successfully registered for your new SkillUp course : ${enrolledCourse.courseName}`);

            console.log(emailResponse);

            return res.status(200).json({
                success: true,
                message: "User is successfully registered for the course"
            })
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong while verifying signature'
            })
        }
    }
    else {
        return res.status(500).json({
            success: false,
            message: 'Invalid request'
        })
    }
}