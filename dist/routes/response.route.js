"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_controller_1 = require("../controllers/response.controller");
const router = express_1.default.Router();
// Route: Save Answer
router.post('/', response_controller_1.saveResponseController);
router.post('/bulk', response_controller_1.saveBulkResponsesController);
exports.default = router;
