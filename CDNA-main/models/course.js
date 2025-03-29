import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Course name is required'], 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required'],
    },
    courseType: {
        type: String,
        enum: ['free', 'paid'],
        required: [true, 'Course type is required'],
    },

    price: {
        type: Number,
        default: 0,



    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot be more than 500 characters long'],
    },
},
    { timestamps: true });

export default mongoose.model('Course', courseSchema);
