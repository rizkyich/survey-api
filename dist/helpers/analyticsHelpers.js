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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateQuestionAnalytics = exports.calculateAverage = exports.countOccurrences = void 0;
const common_interface_1 = require("../interfaces/common.interface");
function countOccurrences(arr) {
    return arr.reduce((counts, val) => {
        const key = String(val);
        counts[key] = (counts[key] || 0) + 1;
        return counts;
    }, {});
}
exports.countOccurrences = countOccurrences;
function calculateAverage(arr) {
    const sum = arr.reduce((total, val) => total + val, 0);
    return arr.length > 0 ? sum / arr.length : 0;
}
exports.calculateAverage = calculateAverage;
function calculateQuestionAnalytics(question, responses) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (question.type) {
            case common_interface_1.QuestionTypeEnum.Radio:
                const responseCounts = countOccurrences(responses.map((response) => response.responseValue));
                return {
                    questionId: question.id,
                    totalResponses: responses.length,
                    responseCounts,
                };
            case common_interface_1.QuestionTypeEnum.RatingScale:
                const ratingValues = responses.map((response) => {
                    var _a;
                    const value = JSON.parse((_a = response.responseValue) !== null && _a !== void 0 ? _a : 'null');
                    if (Array.isArray(value)) {
                        return value.map((v) => Number(v));
                    }
                    else {
                        return Number(value);
                    }
                });
                const flattenedRatings = ratingValues.flat();
                const averageRating = calculateAverage(flattenedRatings);
                return {
                    questionId: question.id,
                    totalResponses: responses.length,
                    averageRating,
                };
            case common_interface_1.QuestionTypeEnum.TextInput:
                const textResponses = responses.map((response) => response.responseValue);
                return {
                    questionId: question.id,
                    totalResponses: responses.length,
                    responses: textResponses,
                };
            case common_interface_1.QuestionTypeEnum.Checkbox:
            case common_interface_1.QuestionTypeEnum.DropdownSelect:
                const optionCounts = {};
                responses.forEach((response) => {
                    var _a;
                    const values = JSON.parse((_a = response.responseValue) !== null && _a !== void 0 ? _a : 'null');
                    if (Array.isArray(values)) {
                        values.forEach((value) => {
                            const key = String(value);
                            optionCounts[key] = (optionCounts[key] || 0) + 1;
                        });
                    }
                    else {
                        const key = String(values);
                        optionCounts[key] = (optionCounts[key] || 0) + 1;
                    }
                });
                return {
                    questionId: question.id,
                    totalResponses: responses.length,
                    optionCounts,
                };
            default:
                throw new Error('Invalid question type');
        }
    });
}
exports.calculateQuestionAnalytics = calculateQuestionAnalytics;
