import express from 'express';
import {
    createCourse,
    // getAllCourses,
    // getCourseById,
    // updateCourse,
    // deleteCourse
} from '../controllers/course_controller.js';  // Ensure the correct path to the controller
import {  verifyToken,IsAdmin } from '../middleware/isAuthenticated.js';

const courseRouter = express.Router();

courseRouter.post('/courses',verifyToken, IsAdmin,createCourse);
// courseRouter.get('/courses', getAllCourses);
// courseRouter.get('/getcoursesById', getCourseById);
// courseRouter.put('/updatecourse/',verifyToken,IsAdmin, updateCourse);
// courseRouter.delete('/deletecourse',verifyToken,IsAdmin, deleteCourse);

export { courseRouter };
