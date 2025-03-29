import { User } from "../models/users.js";
import { errorHandler } from "../utils/error.js";
import { isValidEmail } from "../utils/emailValidation.js";
import jwt from "jsonwebtoken";
import { trusted } from "mongoose";





//  getprofile  the users...........

export const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return next(errorHandler(404, 'User not found!'));

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// getAllUsers in user........................................

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};


// getUser users.................................................

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.query.id);

        if (!user) return next(errorHandler(404, 'User not found!'));

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};
// searchuser..........................................................

export const searchUser = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;

        if (!keyword) return next(errorHandler(400, 'Please provide a keyword to search!'));

        const users = await User.find({ $text: { $search: keyword } });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// updateUserProfile users...............................

export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });

        if (!user) return next(errorHandler(404, 'User not found!'));

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        next(error);trusted
    }
};

// deleteuser users...............................

// export const deleteUser = async (req, res, next) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);

//         if (!user) return next(errorHandler(404, 'User not found!'));

//         res.status(200).json({
//             success: true,
//             message: 'User deleted successfully!'
//         });
//     } catch (error) {
//         next(error);
//     }
// };
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID!',
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
        });
    } catch (error) {
        // Log the error for debugging
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
        next(error);
    }
};

// forget password users...........................

export const forgetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) return next(errorHandler(404, 'User not found!'));

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

        await user.updateOne({ resetToken });

        res.status(200).json({
            success: true,
            message: 'Reset password link sent to your email!',
            resetToken
        });
    } catch (error) {
        next(error);
    }
};


//  reset password ..........................

export const resetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        if (!token) return next(errorHandler(400, 'Token is required!'));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) return next(errorHandler(400, 'Invalid token!'));

        const user = await User.findById(decoded.id);
        console.log(user)

        if (!user) return next(errorHandler(404, 'User not found!'));
        user.password= password;
        user.resetToken="";
        await user.save();
    

        res.status(200).json({
            success: true,
            message: 'Password reset successfully!'
        });
    } catch (error) {
        next(error);
    }
};