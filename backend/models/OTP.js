const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60   // The document will be automatically deleted after 5 minutes of its creation time
    }
})

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, 'Verfication Email from SkillUp', otp);
        console.log("Email sent successfully : ", mailResponse);
    }
    catch (err) {
        console.log("Error occured while sending mail : ", err);
    }
}

otpSchema.pre('save', async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model('OTP', otpSchema);