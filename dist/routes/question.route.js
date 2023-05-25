"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get all questions for a survey
router.get('/surveys/:surveyId/questions', (req, res) => {
    const surveyId = req.params.surveyId;
    // Your logic to fetch all questions for the given surveyId from the database
    res.send(`Get all questions for survey with ID: ${surveyId}`);
});
// Get a specific question
router.get('/questions/:id', (req, res) => {
    const questionId = req.params.id;
    // Your logic to fetch a specific question based on the questionId from the database
    res.send(`Get question with ID: ${questionId}`);
});
// Create a new question for a survey
router.post('/surveys/:surveyId/questions', (req, res) => {
    const surveyId = req.params.surveyId;
    // Your logic to create a new question for the given surveyId based on the data sent in the request body
    res.send(`Create new question for survey with ID: ${surveyId}`);
});
// Update an existing question
router.put('/questions/:id', (req, res) => {
    const questionId = req.params.id;
    // Your logic to update an existing question based on the questionId and the data sent in the request body
    res.send(`Update question with ID: ${questionId}`);
});
// Delete a question
router.delete('/questions/:id', (req, res) => {
    const questionId = req.params.id;
    // Your logic to delete a specific question based on the questionId
    res.send(`Delete question with ID: ${questionId}`);
});
exports.default = router;
