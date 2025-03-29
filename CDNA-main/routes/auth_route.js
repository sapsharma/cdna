import express from 'express';
import { signup, login } from '../controllers/auth_controller.js';

const authRouter = express.Router();  // Use 'authRouter' instead of 'router'

// POST route for user signup
authRouter.post('/signup', signup);
authRouter.post('/login', login);

export { authRouter };  
