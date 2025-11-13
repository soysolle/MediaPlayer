import express from 'express';
import authenticate from '../middleware.js';
import { getHistory, updateHistory } from '../controllers/history.js';

const router = express.Router();
router.get('/', authenticate, getHistory);
router.post('/', authenticate, updateHistory);

export default router;
