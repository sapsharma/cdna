import express from 'express';

import { createQuiz} from '../controllers/quiz_controller.js';
import { IsAdmin, verifyToken } from '../middleware/isAuthenticated.js';


const quizRouter = express.Router();


// Route to create a quiz
quizRouter.post("/CreateQuiz", verifyToken, IsAdmin, createQuiz);
// quizRouter.get("/get", getQuizById);
// quizRouter.get("/getAllQuizzes", getAllQuizzes);
// quizRouter.delete("/delete", verifyToken, IsAdmin, deleteQuiz);

export { quizRouter };
