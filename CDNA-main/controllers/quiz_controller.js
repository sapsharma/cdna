import Quiz from '../models/quiz.js';
import Course from '../models/course.js';
import { errorHandler } from "../utils/error.js";




// Controller function for creating a quiz
export const createQuiz = async (req, res) => {
  try {
    const { courseId, name,  questions } = req.body;
    const currentuser = req.user;
    console.log(currentuser);

    // Validate required fields
    if (!courseId || !name || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Create a new Quiz document
    const newQuiz = new Quiz({
      courseId,
      name,
      createdBy:currentuser._id,
      questions,
    });

    // Save the quiz to the database
    await newQuiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to create quiz.' });
  }
};





//  Get a quiz by ID
// export const getQuizById = async (req, res) => {
//     try {
//         const quiz = await Quiz.findById(req.params.id)
//             .populate('questions')  // Populate questions
//             .populate('createdBy', 'name') // Populate createdBy with the user's name
//             .populate('courseId', 'name'); // Populate courseId with the course name

//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found' });
//         }

//         return res.status(200).json(quiz);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error fetching quiz', error });
//     }
// };

// }

// // getQuizById ..........................................................

// export const getQuizById = async (req, res) => {

//     try {
//         const quiz = await Quiz.findById(req.query.id).populate('CourseId');
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found' });
//         }
//         res.status(200).json(quiz);
//     } catch (error) {
//         res.status(500).json({
//             message: 'Failed to fetch quiz',
//             error: error.message
//         });
//     }
// };

// // Get All Quizzes..............................

// export const getAllQuizzes = async (req, res) => {
//     try {
//         const quizzes = await Quiz.find().populate('CourseId');
//         res.status(200).json(quizzes);
//     } catch (error) {
//         res.status(500).json({
//             message: 'Failed to fetch quizzes',
//             error: error.message
//         });
//     }
// }

// // delete quiz....



// export const deleteQuiz = async (req, res) => {
//     try {
//         const quiz = await Quiz.findByIdAndDelete(req.query.id);
//         ;
//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found' });
//         }
//         res.status(200).json({
//             message: 'Quiz deleted successfully',
//             quiz
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: 'Failed to delete quiz',
//             error: error.message
//         });
//     }
// };
