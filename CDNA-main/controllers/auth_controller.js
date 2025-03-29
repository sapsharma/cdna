import { User } from '../models/users.js';
import  {generateToken}  from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import { errorHandler } from '../utils/error.js';


// Signup
export const signup = async (req, res, next) => {
    try {
        const { name, email, password ,role } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return next(errorHandler(400, 'Email already exists!'));

        const user = await User.create({ name, email, password,role });
        const token =await generateToken(user);

        res.status(201).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        return next(errorHandler(500, 'Signup failed, please try again!'));
    }
};


// Login..............................................................................................

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) return next(errorHandler(401, 'Invalid email or password!'));

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) return next(errorHandler(401, 'Invalid email or password!'));

        const token = await generateToken(user);

        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        return next(errorHandler(500, 'Login failed, please try again!'));
    }
};



