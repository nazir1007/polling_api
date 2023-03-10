// ----- Importing mongoose ----- //
const mongoose = require('mongoose');

//----- Create the Question Schema -----//
const QuestionSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    // include the array of id of all options in the question Schema
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Option'
        }
    ]

}, {
    timestamps: true
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;