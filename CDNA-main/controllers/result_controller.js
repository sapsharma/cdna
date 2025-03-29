
import Result from '../models/result.js';  // Ensure correct file path
import Quiz from '../models/quiz.js';      // Ensure correct file path
import { errorHandler } from "../utils/error.js";  // Ensure correct file path

export const createResult = async (req, res, next) => {
    try {
        // Destructure required fields from req.body
        const { quizId, questionId, answer, courseId } = req.body;
        const currentLoggedInId = req.user._id; // Fetch logged-in user ID

        // Ensure all required fields are present
        if (!quizId || !questionId || answer === undefined) {
            return next(errorHandler(400, 'Missing required fields!'));
        }

        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return next(errorHandler(404, 'Quiz not found!'));

        // Log the fetched quiz for debugging
        console.log("Fetched Quiz:", quiz);

        // Find the specific question in the quiz's questions array
        const question = quiz.questions.find(q => q._id.toString() === questionId);
        if (!question) {
            console.error(`Question not found: ${questionId} in Quiz: ${quizId}`);
            return next(errorHandler(404, 'Question not found!'));
        }

        // Convert answer to a number if necessary
        const userAnswer = parseInt(answer, 10); // assuming answer comes in as a string
        const isCorrect = question.correctAnswer === userAnswer;

        // Log the question fetched
        console.log("Fetched Question:", question);
        console.log("User Answer:", userAnswer, "Correct Answer:", question.correctAnswer);

        // Prepare variables for result
        const correctAnswers = isCorrect ? 1 : 0;
        const wrongAnswers = isCorrect ? 0 : 1;
        const totalScore = correctAnswers;

        // Log scores
        console.log("Correct Answers:", correctAnswers);
        console.log("Wrong Answers:", wrongAnswers);

        // Check if a result already exists for the user and quiz
        let result = await Result.findOne({ quizId, userId: currentLoggedInId });

        if (result) {
            // Update existing result
            result.correctAnswers += correctAnswers;
            result.wrongAnswers += wrongAnswers;
            result.totalScore += totalScore;
            await result.save();
            console.log("Updated existing result:", result);
        } else {
            // Create a new result document
            result = new Result({
                courseId: courseId,
                quizId: quizId,
                userId: currentLoggedInId,
                correctAnswers: correctAnswers,
                wrongAnswers: wrongAnswers,
                totalScore: totalScore,
            });
            // Save the result to the database
            await result.save();
            console.log("Created new result:", result);
        }

        // Send a success response to the client
        res.status(200).json({ message: 'Result created/updated successfully', result });

    } catch (error) {
        console.error("Error in createResult:", error); // Log error for debugging
        next(errorHandler(500, 'Server error, unable to create or update result.')); // Pass error to middleware
    }
};



//  normaly result............................

// import Result from '../models/result.js';  // Ensure correct file path
// import Quiz from '../models/quiz.js';      // Ensure correct file path
// import { errorHandler } from "../utils/error.js";  // Ensure correct file path
// export const createResult = async (req, res, next) => {
//     try {
//         // Destructure required fields from req.body
//         const { quizId, questionId, answer, courseId } = req.body;
//         const currentLoggedInId = req.user._id; // Fetch logged-in user ID

//         // Ensure all required fields are present
//         if (!quizId || !questionId || answer === undefined) {
//             return next(errorHandler(400, 'Missing required fields!'));
//         }

//         // Find the quiz by ID
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) return next(errorHandler(404, 'Quiz not found!'));

//         // Log the fetched quiz for debugging
//         console.log("Fetched Quiz:", quiz);

//         // Find the specific question in the quiz's questions array
//         const question = quiz.questions.find(q => q._id.toString() === questionId);
//         if (!question) {
//             console.error(`Question not found: ${questionId} in Quiz: ${quizId}`);
//             return next(errorHandler(404, 'Question not found!'));
//         }

//         // Convert answer to a number if necessary
//         const userAnswer = parseInt(answer, 10); // assuming answer comes in as a string
//         const isCorrect = question.correctAnswer === userAnswer;

//         // Log the question fetched
//         console.log("Fetched Question:", question);
//         console.log("User Answer:", userAnswer, "Correct Answer:", question.correctAnswer);

//         // Prepare variables for result
//         const correctAnswers = isCorrect ? 1 : 0;
//         const wrongAnswers = isCorrect ? 0 : 1;
//         const totalScore = correctAnswers;

//         // Log scores
//         console.log("Correct Answers:", correctAnswers);
//         console.log("Wrong Answers:", wrongAnswers);

//         // Create a new result document
//         const result = new Result({
//             courseId: courseId,
//             quizId: quizId,
//             userId: currentLoggedInId,
//             correctAnswers: correctAnswers,
//             wrongAnswers: wrongAnswers,
//             totalScore: totalScore,
//         });

//         // Save the result to the database
//         await result.save();

//         // Send a success response to the client
//         res.status(201).json({ message: 'Result created successfully', result });

//     } catch (error) {
//         console.error("Error in createResult:", error); // Log error for debugging
//         next(errorHandler(500, 'Server error, unable to create result.')); // Pass error to middleware
//     }
// };






















// try {

//         // Check if the request body is an array
//         // const results = Array.isArray(req.body) ? req.body : [req.body];

//         const createdResults = []; // Array to hold created results

//         for (const { courseId, quizId, userId, correctAnswers, wrongAnswers, totalScore } of results) {
//             // Validate required fields
//             if (!courseId || !quizId || !userId || correctAnswers == null || wrongAnswers == null || totalScore == null) {
//                 console.log("Missing Fields:", { courseId, quizId, userId, correctAnswers, wrongAnswers, totalScore }); // Log missing fields
//                 return res.status(400).json({ message: 'Please provide all required fields.' });
//             }

//             // Create a new Result document
//             const newResult = new Result({
//                 CourseId: courseId,
//                     QuizId: quizId,
//                 UserId: userId,
//                 CorrectAnswers: correctAnswers,
//                 WrongAnswers: wrongAnswers,
//                 TotalScore: totalScore,
//             });

//             // Save the result to the database
//             await newResult.save();
//             createdResults.push(newResult); // Add created result to the array
//         }

//         res.status(201).json({ message: 'Results created successfully', results: createdResults });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error, unable to create result.' });
//     }
// };
