"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const survey_route_1 = __importDefault(require("./routes/survey.route"));
const question_route_1 = __importDefault(require("./routes/question.route"));
const response_route_1 = __importDefault(require("./routes/response.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const errorHandler_1 = __importDefault(require("./helpers/errorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use('/api/auth', auth_route_1.default);
app.use('/api/surveys', survey_route_1.default);
app.use('/api/questions', question_route_1.default);
app.use('/api/responses', response_route_1.default);
// error handler
app.use(errorHandler_1.default);
// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
