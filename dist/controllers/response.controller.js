"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBulkResponsesController = exports.saveResponseController = void 0;
const response_service_1 = require("../services/response.service");
const HttpError_1 = __importDefault(require("../errors/HttpError"));
function saveResponseController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { respondentName, responseValue, surveyId, questionId } = req.body;
            const response = yield (0, response_service_1.saveAnswer)(respondentName, responseValue, surveyId, questionId);
            res.status(201).json(response);
        }
        catch (error) {
            if (error instanceof HttpError_1.default) {
                res.status(error.statusCode).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    });
}
exports.saveResponseController = saveResponseController;
function saveBulkResponsesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { responses } = req.body;
            // Ensure that the 'responses' field is provided in the request body
            if (!responses || !Array.isArray(responses)) {
                throw new HttpError_1.default(400, 'Invalid data format');
            }
            // Save bulk responses
            const savedResponses = yield (0, response_service_1.saveBulkAnswers)(responses);
            res.status(200).json({ savedResponses });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.saveBulkResponsesController = saveBulkResponsesController;
