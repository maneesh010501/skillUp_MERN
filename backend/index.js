const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const dbConnect = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const fileUpload = require('express-fileupload');

require('dotenv').config();
cloudinaryConnect();
dbConnect();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp'
    })
)

// routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);

//default route
app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running...'
    })
})

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
})