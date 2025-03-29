// import mongoose from 'mongoose';

// const resultSchema = new mongoose.Schema({
//     CourseId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
//     QuizId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
//     UserId: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
//     CorrectAnswers: {
//         type: Number,
//         required: true
//     },
//     WrongAnswers: { type: Number, required: true },
//     TotalScore: { type: Number, required: true },
// }, { timestamps: true });

// const Result = mongoose.model('Result', resultSchema);

// export default Result;
import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    courseId: { // Correct casing to camelCase
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quizId: { // Correct casing to camelCase
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: { // Correct casing to camelCase
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    correctAnswers: { // Correct casing to camelCase
        type: Number,
        required: true
    },
    wrongAnswers: {
        type: Number,
        required: true
    },
    totalScore: { // Correct casing to camelCase
        type: Number,
        required: true
    },
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

export default Result;
