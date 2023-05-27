import express from 'express';

import { saveBulkResponsesController, saveResponseController } from '../controllers/response.controller';

const router = express.Router();

// Route: Save Answer
router.post('/', saveResponseController);
router.post('/bulk', saveBulkResponsesController);

export default router;