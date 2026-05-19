import express from 'express';
const router = express.Router();
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { getSummary, getTrends } from '../controllers/analytics.controller.js';

router.get('/summary', ClerkExpressRequireAuth(), getSummary);
router.get('/trends', ClerkExpressRequireAuth(), getTrends);

export default router;
