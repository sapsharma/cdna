import express from 'express';
import { 
  getMyProfile, 
  getAllUsers, 
  getUser, 
  searchUser,
  updateUserProfile, 
  deleteUser, 
  forgetPassword, 
  resetPassword 
} from '../controllers/user_controller.js';
import { verifyToken } from '../middleware/isAuthenticated.js';

const userRouter = express.Router();  // Use 'userRouter' instead of 'router'

// Routes for user-related operations
userRouter.get("/myprofile", verifyToken, getMyProfile);
userRouter.get("/getallusers", verifyToken, getAllUsers);
userRouter.get("/getuserById", verifyToken, getUser);
userRouter.post("/searchuser", verifyToken, searchUser);
userRouter.put("/updateprofile", verifyToken, updateUserProfile);
userRouter.delete("/deleteUser", verifyToken, deleteUser);

// Password reset routes
userRouter.post('/forgetPassword', forgetPassword);
userRouter.post('/resetPassword', resetPassword);

export { userRouter };  // Export as 'userRouter'
