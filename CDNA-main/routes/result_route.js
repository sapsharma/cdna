import express from 'express';
import {createResult} from '../controllers/result_controller.js'; 
import { IsAdmin, verifyToken } from '../middleware/isAuthenticated.js'; // Ensure the correct path to the controller


const resultRouter = express.Router();

resultRouter.post('/createResult', verifyToken, IsAdmin,createResult);


export { resultRouter };
