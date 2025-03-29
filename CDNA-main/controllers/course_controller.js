import Course from '../models/course.js';
import { errorHandler } from "../utils/error.js";



//  create the courses Api .............................

export const createCourse = async (req, res) => {
    try{
        const { name, createdBy, courseType, price, description } = req.body;
        const newCourse = new Course({
            name,
            createdBy,
            courseType,
            price,
            description
        });
        const savedCourse = await newCourse.save();

        // Send success response
        res.status(201).json({
            message: 'Course created successfully',
            data: savedCourse
        });

    }catch (error) {
            // Send error response
            res.status(500).json({
                message: 'Error creating course',
                error: error.message
            });
        }
    
  
};








































































































// // Create a new course......

// export const createCourse = async (req, res) => {
//     console.log("Route hit");

//     try {
//         const { name } = req.body;

//         // Check if course already exists
//         const existingCourse = await Course.findOne({ name });
//         if (existingCourse) {
//             return res.status(400).json({ message: 'Course already exists' });
//         }

//         console.log("Course does not exist, creating new course");
        
//         // Create a new course
//         const newCourse = await Course.create(req.body);
//         console.log("New course created successfully");

//         return res.status(201).json(newCourse);
//     } catch (error) {
//         console.error("Error creating course:", error);
//         errorHandler(res, error);  // Use your custom error handler
//     }
// };
// // Get all courses
// export const getAllCourses = async (req, res) => {
//     try {
//         const courses = await Course.find();
//         return res.status(200).json(courses);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// };

// // Get course by ID
// export const getCourseById = async (req, res) => {
//     try {
//         const { id } = req.query;
//         const course = await Course.findById(id);
//         if (!course) {
//             return res.status(404).json({ message: 'Course not found' });
//         }
//         return res.status(200).json(course);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// };

// // Update a course
// export const updateCourse = async (req, res) => {
//     try {
//         const { id } = req.query;
//         const { name } = req.body;
//         const updatedCourse = await Course.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
//         if (!updatedCourse) {
//             return res.status(404).json({ message: 'Course not found' });
//         }
//         return res.status(200).json(updatedCourse);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// };

// // Delete a course
// export const deleteCourse = async (req, res) => {
//     try {
//         const { id } = req.query;
//         const deletedCourse = await Course.findByIdAndDelete(id);
//         if (!deletedCourse) {
//             return res.status(404).json({ message: 'Course not found' });
//         }
//         return res.status(200).json({ message: 'Course deleted successfully' });
//     } catch (error) {
//         errorHandler(res, error);
//     }
// };
