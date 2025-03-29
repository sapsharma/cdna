import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        options: [String], // Array of answer options (multiple choices)
        correctAnswer: {
            type: Number, // Index of the correct answer in the `options` array
            required: true
        },

    }]
});
export default mongoose.model('Quiz', quizSchema);








