import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth_route.js';
import { userRouter } from './routes/user_route.js';
import { courseRouter } from './routes/course_route.js';
import {quizRouter} from './routes/quiz_route.js';
import {resultRouter} from './routes/result_route.js';
import connectToMongoDB from './config/database.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Routes Configuration
app.use('/api/v4/auth', authRouter);
app.use('/api/v4/users', userRouter);
app.use('/api/v4/courses', courseRouter);
app.use('/api/v4/quizzes', quizRouter);
app.use('/api/v4/results', resultRouter);



// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

// Health check route
app.get('/', (req, res) => {
    res.send('Server is up and running');
});

const PORT = process.env.PORT || 8000;

connectToMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
        process.exit(1);  // Exit the process if database connection fails
    });
